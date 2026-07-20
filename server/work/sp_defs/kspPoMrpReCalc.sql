CREATE PROC [dbo].[kspPoMrpReCalc]
	@strPoCd	varchar(10),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE @strOrderCd		varchar(20)
DECLARE @strMatlCd		varchar(20)
DECLARE @nMrpSeq		int
DECLARE @strMatlSeq		int
DECLARE	@nNewPoSeq		int
DECLARE @nNewMrpSeq		int
DECLARE @strNewPoQty	float
DECLARE @strBefPoQty	float
DECLARE @strMatlPrice	float
DECLARE @strCurrCd		varchar(20)
DECLARE @strTotAmt		float
DECLARE @nDiffQty		int
DECLARE @strStockQty	float
DECLARE @strUseSize		varchar(20)
DECLARE	@seq			int
DECLARE	@seq2			int
DECLARE	@chkCount		int

set nocount on

delete ksv_po_mrptempre 
where user_id = @strUserNo 

set @seq = 0

set @nNewPoSeq = ( select max(po_seq)+1
					from ksv_po_mst 
					where po_cd = @strPoCd
					and po_seq < 97 
				  )
set @nNewMrpSeq = (select isnull(max(mrp_seq),0) from ksv_po_mrp
					where po_cd = @strPoCd
					and po_seq < 97 
					and mrp_seq < 9998
				  )

-- po_mrptemp 와 po_mrp를 비교 (같이 있는 것)
DECLARE kspPoMrpRe_C1 CURSOR FOR
	 select a.order_cd,a.matl_cd,a.po_qty,sum(b.po_qty),a.mrp_seq 
	 from ksv_po_mrptemp a,ksv_po_mrptempbef b
	 where a.user_id = @strUserNo 
	 and a.po_cd = @strPoCd 
--	 and c.matl_type <> 'Z' 
	 and b.user_id = @strUserNo
	 and b.po_cd = a.po_cd 
	 and b.order_cd = a.order_cd 
	 and b.matl_cd = a.matl_cd 
	 group by a.order_cd,a.matl_cd,a.mrp_seq,a.po_qty
	 having sum(a.po_qty) <> sum(b.po_qty) 
	 order by a.order_cd,a.matl_cd 

OPEN kspPoMrpRe_C1

FETCH NEXT FROM kspPoMrpRe_C1
INTO @strOrderCd,@strMatlCd,@strNewPoQty,@strBefPoQty, @nMrpSeq

WHILE @@FETCH_STATUS = 0
BEGIN
	set @nDiffQty = @strNewPoQty - @strBefPoQty
	set @strTotAmt = @nDiffQty * @strMatlPrice

	if @nDiffQty > 0	-- 초과발주
	begin
		set @nNewMrpSeq = @nNewMrpSeq + 1
		set @seq = @seq + 1

		insert into ksv_po_mrptempre 
		 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
		  matl_seq,matl_price,curr_cd,tot_amt,use_size)
		 values (
		  @strUserNo  
	     ,@seq
		 ,@strPoCd   
		 ,@nNewPoSeq 
		 ,@strOrderCd   
		 ,@strMatlCd   
		 ,@nNewMrpSeq 
		 ,@strNewPoQty 
		 ,@strBefPoQty 
		 ,@nDiffQty 
		 ,'0' 
		 ,'3' 
		 ,@strMatlSeq   
		 ,@strMatlPrice   
		 ,@strCurrCd
		 ,@strTotAmt   
		 ,@strUseSize   
		 ) 
	end
	else
	if @nDiffQty < 0	
	begin
		set @seq = @seq + 1
		insert into ksv_po_mrptempre 
		 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
		  matl_seq,matl_price,curr_cd,tot_amt,use_size)
		 values (
		  @strUserNo  
	     ,@seq
		 ,@strPoCd   
		 ,@nNewPoSeq 
		 ,@strOrderCd   
		 ,@strMatlCd   
		 ,@nMrpSeq
		 ,@strNewPoQty 
		 ,@strBefPoQty 
		 ,@nDiffQty 
		 ,'0' 
		 ,'2' 
		 ,'0'   
		 ,'0'
		 ,''
		 ,'0'
		 ,''
		 ) 
	end

    FETCH NEXT FROM kspPoMrpRe_C1
	INTO @strOrderCd,@strMatlCd,@strNewPoQty,@strBefPoQty,@nMrpSeq
END

print @nMrpSeq 
print @Seq2
print @strOrderCd
print @strMatlCd

CLOSE kspPoMrpRe_C1
DEALLOCATE kspPoMrpRe_C1

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END


-- po_mrptemp 엔 있고 po_mrp에 없는 것
DECLARE kspPoMrpRe_C2 CURSOR FOR
	 select a.order_cd,a.matl_cd,a.po_qty 
	 from ksv_po_mrptemp a,kcd_matl_mem b 
	 where a.user_id = @strUserNo
	 and a.po_cd = @strPoCd
	 and a.matl_cd not in (select matl_cd from ksv_po_mrptempbef 
							where user_id = @strUserNo
							and po_cd = @strPoCd
							and order_cd = a.order_cd) 
--	 and a.matl_cd not like 'Z%' 
	 and b.matl_cd = a.matl_cd 
	 and b.matl_seq = (select max(matl_seq)from kcd_matl_mem where matl_cd=a.matl_cd) 

OPEN kspPoMrpRe_C2

FETCH NEXT FROM kspPoMrpRe_C2
INTO @strOrderCd,@strMatlCd,@strNewPoQty

WHILE @@FETCH_STATUS = 0
BEGIN
	set @strBefPoQty = 0
	set @nNewMrpSeq = @nNewMrpSeq + 1
	set @nDiffQty = @strNewPoQty - @strBefPoQty
	set @strTotAmt = @nDiffQty * @strMatlPrice

	-- 초과발주
		set @seq = @seq + 1
		insert into ksv_po_mrptempre 
		 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
		  matl_seq,matl_price,curr_cd,tot_amt,use_size)
		 values (
		  @strUserNo  
	     ,@seq
		 ,@strPoCd   
		 ,@nNewPoSeq 
		 ,@strOrderCd   
		 ,@strMatlCd   
		 ,@nNewMrpSeq 
		 ,@strNewPoQty 
		 ,@strBefPoQty 
		 ,@nDiffQty 
		 ,'0' 
		 ,'3' 
		 ,@strMatlSeq   
		 ,@strMatlPrice   
		 ,@strCurrCd
		 ,@strTotAmt   
		 ,@strUseSize   
		 ) 

    FETCH NEXT FROM kspPoMrpRe_C2
	INTO @strOrderCd,@strMatlCd,@strNewPoQty
END

CLOSE kspPoMrpRe_C2
DEALLOCATE kspPoMrpRe_C2

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END

-- po_mrptemp 엔 없고 po_mrp에 있는 것 재고발주인거
DECLARE kspPoMrpRe_C3 CURSOR FOR
	 select a.order_cd,a.matl_cd,sum(a.po_qty),a.mrp_seq
	 from ksv_po_mrptempbef a 
	 where a.user_id = @strUserNo
	 and a.po_cd = @strPoCd
	 and right(a.order_cd,2) not in('um','in')
	 and a.matl_cd not in (select matl_cd from ksv_po_mrptemp 
							where user_id = @strUserNo
							and po_cd = a.po_cd 
							and order_cd = a.order_cd) 
--     and a.po_matl_cd=''
	 group by a.order_cd,a.matl_cd,a.mrp_seq
	 having sum(a.po_qty) > 0 	 

OPEN kspPoMrpRe_C3

FETCH NEXT FROM kspPoMrpRe_C3
INTO @strOrderCd,@strMatlCd,@strBefPoQty,@nMrpSeq

WHILE @@FETCH_STATUS = 0
BEGIN
	set @strNewPoQty = 0
	set @nDiffQty = @strNewPoQty - @strBefPoQty
	set @strTotAmt = @nDiffQty * @strMatlPrice
	set @seq = @seq + 1

	-- 재고전환
		insert into ksv_po_mrptempre 
		 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
		  matl_seq,matl_price,curr_cd,tot_amt,use_size)
		 values (
		  @strUserNo  
	     ,@seq
		 ,@strPoCd   
		 ,@nNewPoSeq
		 ,@strOrderCd   
		 ,@strMatlCd   
		 ,@nMrpSeq
		 ,@strNewPoQty 
		 ,@strBefPoQty 
		 ,@nDiffQty
		 ,'0' 
		 ,'2' 
		 ,'0'   
		 ,'0'
		 ,''
		 ,'0'
		 ,''
		 ) 
	
    FETCH NEXT FROM kspPoMrpRe_C3
	INTO @strOrderCd,@strMatlCd,@strBefPoQty,@nMrpSeq
END

CLOSE kspPoMrpRe_C3
DEALLOCATE kspPoMrpRe_C3

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END


				-- po_mrptemp 엔 없고 po_mrp에 있는 것 재고발주인거 20200312중복되어 따로 떼어내서 체크후 인서트
				DECLARE kspPoMrpRe_C3_1 CURSOR FOR
					 select a.order_cd,a.matl_cd,sum(a.po_qty),b.po_mrp_seq
					 from ksv_po_mrptempbef a,ksv_po_mrp b  
					 where a.user_id = @strUserNo
					 and a.po_cd = @strPoCd
					 and right(a.order_cd,2) not in('um','in')
					 and a.matl_cd not in (select matl_cd from ksv_po_mrptemp 
											where user_id = @strUserNo
											and po_cd = a.po_cd 
											and order_cd = a.order_cd) 
					 and a.po_matl_cd='재고발주'
					 and b.po_matl_cd=a.matl_cd
					 and a.po_cd=b.po_cd
					 and a.order_cd=b.order_cd
					 and a.po_qty=0
					 group by a.order_cd,a.matl_cd,b.po_mrp_seq

				OPEN kspPoMrpRe_C3_1

				FETCH NEXT FROM kspPoMrpRe_C3_1
				INTO @strOrderCd,@strMatlCd,@strBefPoQty,@nMrpSeq
				
				WHILE @@FETCH_STATUS = 0
				BEGIN
				
					set @chkCount = 0
					
					select	@chkCount = count(*)
					from ksv_po_mrptempre
					where user_id=@strUserNo and po_cd=@strPoCd and order_cd=@strOrderCd and matl_cd=@strMatlCd
					
					if @chkCount = 0
					begin
				
						set @strNewPoQty = 0
						set @nDiffQty = @strNewPoQty - @strBefPoQty
						set @strTotAmt = @nDiffQty * @strMatlPrice
						set @seq = @seq + 1

						-- 재고전환
							insert into ksv_po_mrptempre 
							 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
							  matl_seq,matl_price,curr_cd,tot_amt,use_size)
							 values (
							  @strUserNo  
							 ,@seq
							 ,@strPoCd   
							 ,@nNewPoSeq
							 ,@strOrderCd   
							 ,@strMatlCd   
							 ,@nMrpSeq
							 ,@strNewPoQty 
							 ,@strBefPoQty 
							 ,@nDiffQty
							 ,'0' 
							 ,'2' 
							 ,'0'   
							 ,'0'
							 ,''
							 ,'0'
							 ,''
							 ) 
					end							 
					
					FETCH NEXT FROM kspPoMrpRe_C3_1
					INTO @strOrderCd,@strMatlCd,@strBefPoQty,@nMrpSeq
				END

				CLOSE kspPoMrpRe_C3_1
				DEALLOCATE kspPoMrpRe_C3_1

				select	@Error = @@ERROR
				if @Error != 0 BEGIN return @Error END


-- 재고사용분 계산
DECLARE kspPoMrpRe_C4 CURSOR FOR
	 select order_cd,po_matl_cd,sum(po_qty) 
	 from ksv_po_mrp 
	 where po_cd = @strPoCd 
	 and po_matl_cd in (select matl_cd from ksv_po_mrptempre 
						 where user_id = @strUserNo
						 and po_cd = @strPoCd) 
	 group by order_cd,po_matl_cd 

OPEN kspPoMrpRe_C4

FETCH NEXT FROM kspPoMrpRe_C4
INTO @strOrderCd,@strMatlCd,@strStockQty

WHILE @@FETCH_STATUS = 0
BEGIN

--20230913 위 쿼리에서 없는거 업데이트가 안되어서 여기에 체크 추가

					set @chkCount = 0
					
					select	@chkCount = count(*)
					from ksv_po_mrptempre
					where user_id=@strUserNo and po_cd=@strPoCd and order_cd=@strOrderCd and matl_cd=@strMatlCd
					
					if @chkCount = 0
					begin
				
						set @seq = @seq + 1

						-- 재고전환
							insert into ksv_po_mrptempre 
							 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
							  matl_seq,matl_price,curr_cd,tot_amt,use_size)
							 values (
							  @strUserNo  
							 ,@seq
							 ,@strPoCd   
							 ,@nNewPoSeq
							 ,@strOrderCd   
							 ,@strMatlCd   
							 ,@nMrpSeq
							 ,@strStockQty 
							 ,@strStockQty 
							 ,'0'
							 ,'0' 
							 ,'2' 
							 ,'0'   
							 ,'0'
							 ,''
							 ,'0'
							 ,''
							 ) 
					end							 
--요기까지					




	 update ksv_po_mrptempre set 
		 stock_qty = @strStockQty  
	 where user_id = @strUserNo  
	 and po_cd = @strPoCd  
	 and order_cd = @strOrderCd  
	 and matl_cd = @strMatlCd  
	
	 update ksv_po_mrptempre set 
		 diff_po_type ='2'
		,diff_qty = new_qty-bef_qty-stock_qty
	 where user_id = @strUserNo  
	 and po_cd = @strPoCd  
	 and order_cd = @strOrderCd  
	 and matl_cd = @strMatlCd  
	 and new_qty < bef_qty+stock_qty
	
    FETCH NEXT FROM kspPoMrpRe_C4
	INTO @strOrderCd,@strMatlCd,@strStockQty
END

CLOSE kspPoMrpRe_C4
DEALLOCATE kspPoMrpRe_C4

DECLARE kspPoMrpRe_C5 CURSOR FOR
	 select matl_cd,diff_qty
	 from ksv_po_mrptempre 
	 where user_id = @strUserNo  
	 and po_cd = @strPoCd  

OPEN kspPoMrpRe_C5

FETCH NEXT FROM kspPoMrpRe_C5 INTO @strMatlCd,@nDiffQty

WHILE @@FETCH_STATUS = 0
BEGIN
	 select @strMatlSeq=matl_seq,@strMatlPrice=matl_price,@strCurrCd=curr_cd
	 from kcd_matl_mem
	 where matl_cd = @strMatlCd 
	 and matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd=@strMatlCd)
	 
	 update ksv_po_mrptempre set 
		 matl_seq = @strMatlSeq
		,matl_price = @strMatlPrice
		,curr_cd = @strCurrCd
		,tot_amt = @strMatlPrice*@nDiffQty
	 where user_id = @strUserNo  
	 and po_cd = @strPoCd  
	 and matl_cd = @strMatlCd  
	
	FETCH NEXT FROM kspPoMrpRe_C5 INTO @strMatlCd,@nDiffQty
END

CLOSE kspPoMrpRe_C5
DEALLOCATE kspPoMrpRe_C5

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END









-- mrp_seq 없는것들 계산
DECLARE kspPoMrpRe_C3_mrpseq CURSOR FOR


select a.mrp_seq,b.seq,b.order_cd,b.matl_cd
from ksv_po_mrp a,ksv_po_mrptempre b
where a.po_cd=b.po_cd
and a.po_cd=@strPoCd
and b.user_id=@strUserNo
and a.order_cd=b.order_cd
and a.matl_cd=b.matl_cd
and a.diff_po_type in ('0','3')
and a.use_po_type='1'
and a.po_qty > 0
and b.mrp_seq is null

OPEN kspPoMrpRe_C3_mrpseq

FETCH NEXT FROM kspPoMrpRe_C3_mrpseq
INTO @nMrpSeq,@Seq2,@strOrderCd,@strMatlCd

print @nMrpSeq 
print @Seq2
print @strOrderCd
print @strMatlCd

WHILE @@FETCH_STATUS = 0
BEGIN
		update ksv_po_mrptempre set mrp_seq=@nMrpSeq
		where user_id=@strUserNo
		and po_cd=@strPoCd
		and seq=@Seq2
		and order_cd=@strOrderCd
		and matl_cd=@strMatlCd
		and mrp_seq is null
		
    FETCH NEXT FROM kspPoMrpRe_C3_mrpseq
	INTO @nMrpSeq,@Seq2,@strOrderCd,@strMatlCd
END		

CLOSE kspPoMrpRe_C3_mrpseq
DEALLOCATE kspPoMrpRe_C3_mrpseq

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END





RETURN







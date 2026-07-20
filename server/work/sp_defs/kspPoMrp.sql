CREATE PROC [dbo].[kspPoMrp]
	@strPoCd	varchar(10),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE	@strRegdatetime	varchar(14)
DECLARE @strCurrDate	varchar(8)
DECLARE @seq			int
DECLARE @strOrderCd		varchar(20)
DECLARE @strProdCd		varchar(20)
DECLARE @strMatlCd		varchar(20)
DECLARE @strMatlSeq		int
DECLARE @strMrpSeq		int
DECLARE @strUseQty		float
DECLARE @strSumQty		float
DECLARE @strMatlPrice	float
DECLARE @strCurrCd		varchar(20)
DECLARE @strTotAmt		float
DECLARE @strUseRealQty	float
DECLARE @strUseSumQty	float
DECLARE @strCnt			int

set nocount on

set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)
set @strCurrDate = left(@strRegdatetime,8)
set @seq = 0

delete ksv_po_mrp 
where po_cd = @strPoCd 
and po_seq = 1

DECLARE kspPoMrp_C1 CURSOR FOR
select a.po_cd,a.order_cd,a.matl_cd,a.matl_seq,e.matl_price,e.curr_cd,sum(net_qty) 
from ksv_po_mrpnet a,kcd_matl_mem e 
where a.po_cd = @strPoCd 
and e.matl_cd = a.matl_cd 
and e.matl_seq = a.matl_seq 
group by a.po_cd,a.order_cd,a.matl_cd,a.matl_seq,e.matl_price,e.curr_cd 
order by a.po_cd,a.order_cd,a.matl_cd 

OPEN kspPoMrp_C1

FETCH NEXT FROM kspPoMrp_C1
INTO @strPoCd,@strOrderCd,@strMatlCd,@strMatlSeq,@strMatlPrice,@strCurrCd,@strSumQty

WHILE @@FETCH_STATUS = 0
BEGIN
	set @seq = @seq + 1
	set @strMrpSeq = @seq
	set @strUseRealQty = @strSumQty
	set @strUseQty = round(@strSumQty+0.4999,0,0)
	set @strTotAmt = @strSumQty * @strMatlPrice

	 insert into ksv_po_mrp 
	 (po_cd,po_seq,order_cd,matl_cd,mrp_seq,matl_seq,matl_price,use_size,use_qty,
	  po_qty,bef_po_qty,diff_qty,diff_po_type,change_reason,use_po_type,
	  curr_cd,tot_amt,curr_date,usd_amt,status_cd,reg_user,reg_datetime,use_real_qty,use_int_qty) 
	 values (
		@strPoCd   
	 ,1 
	 ,@strOrderCd   
	 ,@strMatlCd   
	 ,@strMrpSeq   
	 ,@strMatlSeq   
	 ,@strMatlPrice   
	 , ''
	 ,@strUseQty   
	 ,@strUseQty   
	 ,0  
	 ,0  
	 ,0  
	 ,''
	 ,1 
	 ,@strCurrCd   
	 ,@strTotAmt   
	 ,@strCurrDate   
	 ,0  
	 ,0 
	 ,@strUserNo   
	 ,@strRegdatetime   
	 ,@strUseRealQty   
	 ,@strUseQty   
	 ) 

    FETCH NEXT FROM kspPoMrp_C1
    INTO @strPoCd,@strOrderCd,@strMatlCd,@strMatlSeq,@strMatlPrice,@strCurrCd,@strSumQty
END

CLOSE kspPoMrp_C1
DEALLOCATE kspPoMrp_C1

update ksv_po_mrp set
usd_amt = tot_amt * (select usd_rate from kcd_currency
					where curr_cd = ksv_po_mrp.curr_cd
					and start_date = ksv_po_mrp.curr_date)
where po_cd = @strPoCd
and po_seq = 1 

update ksv_po_mst set 
	po_status = '2', 
	curr_date = @strCurrDate
where po_cd = @strPoCd
and po_seq = 1 


-- 2015.4 자재별 실제소요량 합으로 소요량 다시 계산
DECLARE kspPoMrp_C2 CURSOR FOR
select a.matl_cd,sum(use_real_qty) 
from ksv_po_mrp a
where a.po_cd = @strPoCd 
group by a.matl_cd
order by a.matl_cd

OPEN kspPoMrp_C2

FETCH NEXT FROM kspPoMrp_C2
INTO @strMatlCd,@strSumQty

WHILE @@FETCH_STATUS = 0
BEGIN
	set @strUseSumQty = round(@strSumQty+0.4999,0,0)

	update ksv_po_mrp set 
		use_sum_qty = @strUseSumQty
	where po_cd = @strPoCd
	and matl_cd = @strMatlCd

    FETCH NEXT FROM kspPoMrp_C2
    INTO @strMatlCd,@strSumQty
END

CLOSE kspPoMrp_C2
DEALLOCATE kspPoMrp_C2


DECLARE kspPoMrp_C3 CURSOR FOR
select a.matl_cd,count(*),a.use_sum_qty
from ksv_po_mrp a
where a.po_cd = @strPoCd 
group by a.matl_cd,use_sum_qty
order by a.matl_cd

OPEN kspPoMrp_C3

FETCH NEXT FROM kspPoMrp_C3
INTO @strMatlCd,@strCnt,@strUseSumQty

WHILE @@FETCH_STATUS = 0
BEGIN

	DECLARE kspPoMrp_C4 CURSOR FOR
	select a.mrp_seq,a.use_real_qty
	from ksv_po_mrp a
	where a.po_cd = @strPoCd 
	and a.matl_cd = @strMatlCd
	and right(a.order_cd,7)<>'Minimum'		--20190903 미니멈오더의 null 수량때문에 뺌
--	order by a.order_cd
	order by 2

	OPEN kspPoMrp_C4

	FETCH NEXT FROM kspPoMrp_C4
	INTO @strMrpSeq,@strUseRealQty

	WHILE @@FETCH_STATUS = 0
	BEGIN

		if @strCnt = 1
			set @strUseQty = @strUseSumQty
		else
		begin
			set @strUseQty = round(@strUseRealQty,0,0)
			set @strUseSumQty = @strUseSumQty - @strUseQty
			set @strCnt = @strCnt - 1
		end
		
		update ksv_po_mrp set 
			use_qty = @strUseQty,
			po_qty = @strUseQty
		where po_cd = @strPoCd
		and matl_cd = @strMatlCd
		and mrp_seq = @strMrpSeq

		FETCH NEXT FROM kspPoMrp_C4
		INTO @strMrpSeq,@strUseRealQty
	END

	CLOSE kspPoMrp_C4
	DEALLOCATE kspPoMrp_C4


    FETCH NEXT FROM kspPoMrp_C3
    INTO @strMatlCd,@strCnt,@strUseSumQty
END

CLOSE kspPoMrp_C3
DEALLOCATE kspPoMrp_C3




select	@Error = @@ERROR

if @Error != 0
BEGIN
	return @Error
END

RETURN



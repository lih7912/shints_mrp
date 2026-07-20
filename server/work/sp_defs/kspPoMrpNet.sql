
CREATE PROC [dbo].[kspPoMrpNet]
	@strPoCd	varchar(10),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE	@strRegdatetime	varchar(14)
DECLARE @seq			int
DECLARE @strOrderCd		varchar(20)
DECLARE @strProdCd		varchar(20)
DECLARE @strMatlCd		varchar(20)
DECLARE @strMatlSeq		int
DECLARE @strMrpSeq		int
DECLARE @strProdSeq		int
DECLARE @strUseSize		varchar(20)
DECLARE @strRemark		varchar(200)
DECLARE @strVendorCd	varchar(20)
DECLARE @strNet			float
DECLARE @strLoss		float
DECLARE @strGross		float
DECLARE @strUseQty		float
DECLARE @strSizeGroup	varchar(50)
DECLARE @strSizeCnt		varchar(300)
DECLARE @strCountFlag	varchar(20)
DECLARE @strSizeSeq		int
DECLARE @strSizeMax		int
DECLARE @strUnitRate	float
DECLARE @strNetQty		float
DECLARE @strCountry		varchar(20)
DECLARE @strNatCd		varchar(20)
DECLARE @strNatProd		varchar(20)
DECLARE @dwUseQty		float
DECLARE @nNatCnt		int
DECLARE @index			int
DECLARE @max			int
DECLARE @sum			int
DECLARE @i				int
DECLARE @nSizeCnt		int
DECLARE @dwSizeQty		float
DECLARE @dwSizeRate		float
DECLARE @strOrdCnt		int
DECLARE @strAddFlag		varchar(1)

set nocount on

DECLARE  @temp_tb table(   
	nIndex		int,						
	nSizeCnt    int,
	dwSizeQty   float,
	dwSizeRate  float
)                                                

set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)

delete ksv_order_mrp_seqmax 
where user_id = @strUserNo 

insert into ksv_order_mrp_seqmax
select @strUserNo,order_cd,prod_cd,max(order_mrp_seq)
from ksv_order_mrp
where order_cd in (select order_cd from ksv_po_mem where po_cd=@strPoCd)
group by order_cd,prod_cd
order by order_cd

delete ksv_po_mrpnet 
where po_cd = @strPoCd 

DECLARE kspPoMrpNet_C1 CURSOR FOR
	 select a.po_cd,a.order_cd,b.prod_cd,b.add_flag,c.matl_cd,e.matl_seq,c.seq,
			c.use_size,c.remark,c.net,c.loss,c.gross,d.vendor_cd,
			b2.size_group,b.size_cnt,d.count_flag,f.size_cnt,b2.nat_cd,c.country 
	 from ksv_po_mem a,ksv_order_mem b,ksv_order_mrp c,kcd_matl_mst d,kcd_matl_mem e,ksv_order_mst b2,kcd_size_mst f,ksv_order_mrp_seqmax c2  
	 where a.po_cd = @strPoCd 
	 and a.po_seq = 1 
	 and b.order_cd = a.order_cd 
	 and c.order_cd = a.order_cd 
	 and c.prod_cd = b.prod_cd 
	 and d.matl_cd = c.matl_cd 
	 and e.matl_cd = c.matl_cd 
and c.order_mrp_seq =c2.order_mrp_seq
and c2.order_cd = a.order_cd
and c2.user_id=@strUserNo
and c.prod_cd =c2.prod_cd
	 and e.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd=c.matl_cd) 
	 and b2.order_cd = a.order_cd 
	 and f.size_group = b2.size_group 

OPEN kspPoMrpNet_C1

FETCH NEXT FROM kspPoMrpNet_C1
INTO @strPoCd,@strOrderCd,@strProdCd,@strAddFlag,@strMatlCd,@strMatlSeq,@strProdSeq,@strUseSize,@strRemark,
	 @strNet,@strLoss,@strGross,@strVendorCd,@strSizeGroup,@strSizeCnt,@strCountFlag,@strSizeMax,@strNatCd,@strCountry

WHILE @@FETCH_STATUS = 0
BEGIN
	set @strUseSize = Replace(@strUseSize,' ','')
	delete from @temp_tb where nIndex >= 0

	-- size_qty
	set @max = @strSizeMax
	set @sum = 0
	set @i = 0

	while @i < @max
	begin
		set @nSizeCnt = Substring(@strSizeCnt,@i*6+1,6)
		set @sum = @sum + @nSizeCnt
		set @dwSizeQty = 0.0
		set @dwSizeRate = 1.0

		insert into @temp_tb
		values (@i,@nSizeCnt,@dwSizeQty,@dwSizeRate)

		set @i = @i + 1
	end
	set @strOrdCnt = @sum
/*	
	if @strOrderCd='BS21-C0055' 
	begin
		if @strMatlCd='S15-34442' 
		begin
			print cast(@strOrdCnt as varchar)
		end
	end
*/
	-- ord_cnt
	if @strUseSize <> ''
	begin
		set @strSizeSeq = ( select size_seq 
							from kcd_size_mem 
							where size_group = @strSizeGroup 
							and size_val = @strUseSize 
						  )

		set @strOrdCnt = Substring(@strSizeCnt,(@strSizeSeq-1)*6+1,6)

		if @strOrdCnt = 0
			update @temp_tb set nSizeCnt = 0
		else
		if @strSizeSeq <> ''
			update @temp_tb set nSizeCnt = 0 where nIndex <> @strSizeSeq - 1
	end
/*	
	if @strOrderCd='BS21-C0055' 
	begin
	if @strMatlCd='S15-34442' 
		begin
			print cast(@strOrdCnt as varchar)
		end
	end
*/		
	-- count_flag
	if @strCountFlag = '0'
	begin
		DECLARE kspPoMrpNet_C3 CURSOR FOR
			select size_seq,unit_rate
			from kcd_size_mem 
			where size_group like @strSizeGroup escape '[' 
			order by size_seq 

		OPEN kspPoMrpNet_C3

		FETCH NEXT FROM kspPoMrpNet_C3
		INTO @strSizeSeq,@strUnitRate

		WHILE @@FETCH_STATUS = 0
		BEGIN
			update @temp_tb set dwSizeRate = @strUnitRate where nIndex <> @strSizeSeq - 1

			FETCH NEXT FROM kspPoMrpNet_C3
			INTO @strSizeSeq,@strUnitRate
		END

		CLOSE kspPoMrpNet_C3
		DEALLOCATE kspPoMrpNet_C3
	end

	-- use_qty
	update @temp_tb set dwSizeQty = nSizeCnt * dwSizeRate
	set @dwUseQty = (select sum(@strGross * dwSizeQty) from @temp_tb)
	set @strNetQty = @dwUseQty;
	set @strUseQty = Round(@dwUseQty+0.4999,0,0);

	-- country
	if @strCountry <> '' and @strNatCd <> ''
	begin
		set @nNatCnt = CharIndex(@strNatCd,@strCountry,0)
		if @nNatCnt = 0
			set @strOrdCnt = 0
	end
/*	
	if @strOrderCd='BS21-C0055' 
	begin
	if @strMatlCd='S15-34442' 
		begin
			print cast(@strOrdCnt as varchar)
		end
	end	
*/	
	-- insert
	if @strOrdCnt > 0
	begin
		 insert into ksv_po_mrpnet 
		 (po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
		  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime,country) 
		 values (
		    @strPoCd   
		 ,  @strOrderCd   
		 ,  @strProdCd   
		 ,  @strAddFlag   
		 ,  @strMatlCd   
		 ,  @strMatlSeq   
		 ,  @strProdSeq   
		 ,  @strUseSize   
		 ,  @strRemark   
		 ,  @strNet   
		 ,  @strLoss   
		 ,  @strGross   
		 ,  @strVendorCd   
		 ,  @strOrdCnt   
		 ,  @strNetQty   
		 ,  @strUseQty   
		 ,  '0'
		 ,  @strUserNo   
		 ,  @strRegdatetime   
		 ,  @strCountry
		 ) 
	end

    FETCH NEXT FROM kspPoMrpNet_C1
    INTO @strPoCd,@strOrderCd,@strProdCd,@strAddFlag,@strMatlCd,@strMatlSeq,@strProdSeq,@strUseSize,@strRemark,
		 @strNet,@strLoss,@strGross,@strVendorCd,@strSizeGroup,@strSizeCnt,@strCountFlag,@strSizeMax,@strNatCd,@strCountry
END

CLOSE kspPoMrpNet_C1
DEALLOCATE kspPoMrpNet_C1

exec kspPoMrpNetCountry @strPoCd,@strUserNo

select	@Error = @@ERROR

if @Error != 0
BEGIN
	return @Error
END

RETURN









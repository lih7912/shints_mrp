
CREATE PROC [dbo].[kspOrderSizeTot]
	@strPoCd	varchar(10),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE	@strRegdatetime	varchar(14)
DECLARE @strOrderCd		varchar(20)
DECLARE @strProdCd		varchar(20)
DECLARE @max			int
DECLARE @sum			int
DECLARE @i				int
DECLARE @nSizeCnt		int
DECLARE @LenNetQty		int
DECLARE @strSizeMax		varchar(10)
DECLARE @strOrdCnt		varchar(300)
DECLARE @UseQty			varchar(10)
DECLARE @strUseQty		varchar(10)

set nocount on

set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)

delete from ksv_order_mem_sizetot
where user_id=@strUserNo

DECLARE kspOrderSizeTot_SizeTot CURSOR FOR
	select distinct a.order_cd,b.prod_cd,d.size_cnt
	from ksv_po_mem a,ksv_order_mem b,ksv_order_mst c,kcd_size_mst d
	where a.po_cd=@strPoCd
	and a.po_seq=1
	and a.order_cd=b.order_cd
	and c.order_cd=b.order_cd
	and c.size_group=d.size_group
	order by 1,2
	
OPEN kspOrderSizeTot_SizeTot

FETCH NEXT FROM kspOrderSizeTot_SizeTot
INTO @strOrderCd,@strProdCd,@strSizeMax

WHILE @@FETCH_STATUS = 0
BEGIN

	set @strOrdCnt = ''

	set @max = @strSizeMax
	set @sum = 0
	set @i = 0

	while @i < @max
	begin

		DECLARE kspOrderSizeTot CURSOR FOR
		
			select sum(cast(substring(b.size_cnt,@i*6+1,6) as int))
			from ksv_po_mem a,ksv_order_mem b,ksv_order_mst c
			where a.po_cd=@strPoCd
			and b.order_cd=@strOrderCd
			and b.prod_cd=@strProdCd
			and a.po_seq=1
			and a.order_cd=b.order_cd
			and c.order_cd=b.order_cd
			
		OPEN kspOrderSizeTot

		FETCH NEXT FROM kspOrderSizeTot
		INTO @UseQty

		WHILE @@FETCH_STATUS = 0
		BEGIN
		
			set @LenNetQty = LEN(@UseQty)
			set @strUseQty = @UseQty

			IF @LenNetQty = 0
				BEGIN
					set  @strUseQty = '000000' + @strUseQty
				END
			ELSE IF @LenNetQty = 1 
				BEGIN
					set  @strUseQty = '00000' + @strUseQty
				END
			ELSE IF @LenNetQty = 2 
				BEGIN
					set  @strUseQty = '0000' + @strUseQty
				END
			ELSE IF @LenNetQty = 3 
				BEGIN
					set  @strUseQty = '000' + @strUseQty
				END
			ELSE IF @LenNetQty = 4 
				BEGIN
					set  @strUseQty = '00' + @strUseQty
				END
			ELSE IF @LenNetQty = 5 
				BEGIN
					set  @strUseQty = '0' + @strUseQty
				END						

			set @strOrdCnt = @strOrdCnt + @strUseQty		
		
			FETCH NEXT FROM kspOrderSizeTot
			INTO @UseQty
		END
		CLOSE kspOrderSizeTot
		DEALLOCATE kspOrderSizeTot		
		
		set @i = @i + 1
	end
	
	
	 insert into ksv_order_mem_sizetot 
	 (user_id,order_cd,prod_cd,size_cnt) 
	 values (
	    @strUserNo   
	 ,  @strOrderCd   
	 ,  @strProdCd   
	 ,  @strOrdCnt
	 ) 		










	FETCH NEXT FROM kspOrderSizeTot_SizeTot
	INTO @strOrderCd,@strProdCd,@strSizeMax
END
CLOSE kspOrderSizeTot_SizeTot
DEALLOCATE kspOrderSizeTot_SizeTot




select	@Error = @@ERROR

if @Error != 0
BEGIN
	return @Error
END

RETURN




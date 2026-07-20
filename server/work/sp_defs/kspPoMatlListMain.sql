CREATE PROC [dbo].[kspPoMatlListMain]
	@strPoCd	varchar(30),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE	@strRegdatetime	varchar(14)
DECLARE	@strCurrDate	varchar(8)
DECLARE	@seq			int
DECLARE @strOrderCd		varchar(20)
DECLARE @strVendorCd	varchar(10)
DECLARE @strMatlCd		varchar(10)
DECLARE @MatlPrice		float
DECLARE @MatlSeq		int
DECLARE @NetQty			float
DECLARE @UseQty			int
DECLARE @UsdRate		float
DECLARE @TotQty			int
DECLARE @LenNetQty		int
DECLARE @strOldVendorCd	varchar(20)
DECLARE	@Cnt			int
DECLARE	@Cnt2			int
DECLARE	@strCount		varchar(10)
DECLARE	@strCnt			varchar(10)
DECLARE	@strCnt2		varchar(10)
DECLARE @strUseQty		varchar(800)
DECLARE	@strOrdCnt		varchar(800)
DECLARE @strTotCnt		varchar(10)


set nocount on

set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)
set @strCurrDate = left(@strRegdatetime,8)
set @seq = 0

set @Cnt = 0
set @Cnt2 = 0
set @strVendorCd = ''
set @strOldVendorCd = ''
set @strOrdCnt = ''
set @TotQty = 0


DELETE FROM  KSV_PO_MATLLIST WHERE PO_CD = @strPoCd

select	@Error = @@ERROR

if @Error != 0
BEGIN
	return @Error
END

DECLARE  @temp_table table( 
	user_id  varchar(30),
	order_cd  varchar(10)
)

DECLARE kspPoMatlListMain_C1 CURSOR FOR
SELECT A.ORDER_CD  
FROM         KSV_ORDER_MST AS A INNER JOIN 
	KSV_ORDER_MEM AS B ON A.ORDER_CD = B.ORDER_CD INNER JOIN 
	KCD_BUYER AS C ON LEFT(A.ORDER_CD, 2) = C.BUYER_CD INNER JOIN 
	KCD_STYLE AS D ON A.STYLE_CD = D.STYLE_CD INNER JOIN 
	KCD_FACTORY AS E ON A.FACTORY_CD = E.FACTORY_CD INNER JOIN 
	KSV_PO_MEM AS F ON A.ORDER_CD = F.ORDER_CD INNER JOIN 
	KSV_PO_MST AS G ON F.PO_CD = G.PO_CD 
WHERE  (F.PO_CD = @strPoCd) AND (F.PO_SEQ='1') AND (G.PO_SEQ='1') 
GROUP BY A.ORDER_CD

OPEN	kspPoMatlListMain_C1

FETCH NEXT FROM kspPoMatlListMain_C1
INTO @strOrderCd

WHILE @@FETCH_STATUS = 0
BEGIN
	set @seq = @seq + 1

	INSERT INTO @temp_table VALUES(@strUserNo, @strOrderCd)

	FETCH NEXT FROM kspPoMatlListMain_C1
	INTO @strOrderCd
END

CLOSE	kspPoMatlListMain_C1
DEALLOCATE kspPoMatlListMain_C1


DECLARE kspPoMatlListMain_C1 CURSOR FOR
select    b.vendor_cd , a.matl_cd , c.matl_price ,c.matl_seq
from KSV_PO_MRP AS A INNER JOIN 
	KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD INNER JOIN  
	KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ INNER JOIN 
	KCD_VENDOR AS D ON b.VENDOR_CD = D.VENDOR_CD 
where (a.po_cd = @strPoCd) and a.diff_po_type <> '2'
group by b.vendor_cd, a.matl_cd, c.matl_price, c.matl_seq, d.vendor_name, b.matl_name, b.color, b.spec 
order by d.vendor_name, b.matl_name, b.color, b.spec 

OPEN	kspPoMatlListMain_C1

FETCH NEXT FROM kspPoMatlListMain_C1
INTO @strVendorCd, @strMatlCd, @MatlPrice, @MatlSeq

WHILE @@FETCH_STATUS = 0
BEGIN
	
	IF (@strVendorCd <> @strOldVendorCd)
		BEGIN
			set @strOldVendorCd = @strVendorCd
			set @Cnt = @Cnt + 1
			set @Cnt2 = 1
		END
	set	@strCnt = @Cnt
	set	@strCnt2 = @Cnt2
	set @strCount = @strCnt +'-'+ @strCnt2 

	DECLARE kspPoMatlListMain_C2 CURSOR FOR
	select    order_cd
	from @temp_table 
	where (user_id = @strUserNo) 
	
	OPEN	kspPoMatlListMain_C2

	FETCH NEXT FROM kspPoMatlListMain_C2
	INTO @strOrderCd

	WHILE @@FETCH_STATUS = 0
	BEGIN

		set @UseQty = 0

		DECLARE kspPoMatlListMain_C3 CURSOR FOR
		select  sum(a.po_qty)
		from ksv_po_mrp as a inner join
			kcd_matl_mem as b on a.matl_seq = b.matl_seq and a.matl_cd = b.matl_cd
		where a.po_cd = @strPoCd and a.matl_cd = @strMatlCd and a.order_cd = @strOrderCd and a.diff_po_type <> '2' and left(a.matl_cd,1) <> 'Z'
		group by a.matl_cd, a.po_cd
			
		OPEN	kspPoMatlListMain_C3
	
		FETCH NEXT FROM kspPoMatlListMain_C3
		INTO @NetQty

		WHILE @@FETCH_STATUS = 0
		BEGIN

			set @UseQty = @NetQty

			FETCH NEXT FROM kspPoMatlListMain_C3
			INTO @NetQty

		END

		CLOSE kspPoMatlListMain_C3
		DEALLOCATE kspPoMatlListMain_C3

		set @TotQty = @TotQty + @UseQty
		set @LenNetQty = LEN(@UseQty)
		set @strUseQty = @UseQty
		
		IF @LenNetQty = 1
			BEGIN
				IF @strUseQty = '0'
					BEGIN
						set @strUseQty = '________'
					END
				ELSE
					BEGIN
						set @strUseQty = '0000000' + @strUseQty
					END				
			END
		ELSE IF @LenNetQty = 2 
			BEGIN
				set @strUseQty = '000000' + @strUseQty
			END
		ELSE IF @LenNetQty = 3 
			BEGIN
				set @strUseQty = '00000' + @strUseQty
			END
		ELSE IF @LenNetQty = 4 
			BEGIN
				set @strUseQty = '0000' + @strUseQty
			END
		ELSE IF @LenNetQty = 5 
			BEGIN
				set @strUseQty = '000' + @strUseQty
			END
		ELSE IF @LenNetQty = 6 
			BEGIN
				set @strUseQty = '00' + @strUseQty
			END
		ELSE IF @LenNetQty = 7 
			BEGIN
				set @strUseQty = '0' + @strUseQty
			END						

		set @strOrdCnt = @strOrdCnt + @strUseQty

		FETCH NEXT FROM kspPoMatlListMain_C2
		INTO @strOrderCd

	END	

	CLOSE kspPoMatlListMain_C2
	DEALLOCATE kspPoMatlListMain_C2

--	set @strTotCnt = convert(varchar(10),convert(numeric(10),@TotQty))

	INSERT INTO  KSV_PO_MATLLIST (PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, REG_USER, REG_DATETIME ) 
	 VALUES ( @strPoCd, @strVendorCd, @strCount, @strMatlCd, @MatlSeq, @TotQty, @strOrdCnt, @strUserNo , @strRegdatetime) 				


	set @strOrdCnt = ''
	set @Cnt2 = @Cnt2 + 1
	set @TotQty = 0

	FETCH NEXT FROM kspPoMatlListMain_C1
	INTO @strVendorCd, @strMatlCd, @MatlPrice, @MatlSeq

END

CLOSE kspPoMatlListMain_C1
DEALLOCATE kspPoMatlListMain_C1



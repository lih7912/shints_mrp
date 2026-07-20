



CREATE PROC [dbo].[kspPoMatlListSample]
	@strPoCd	varchar(30),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error				int
DECLARE	@strRegdatetime		varchar(14)
DECLARE	@strCurrDate		varchar(8)
DECLARE	@seq				int
DECLARE @strVendorCd		varchar(10)
DECLARE @strOldVendorCd		varchar(10)
DECLARE @strOVendorCd		varchar(10)
DECLARE @strMatlCd			varchar(10)
DECLARE @strOrderCd			varchar(10)
DECLARE @MatlSeq			int
DECLARE @strVendorName		varchar(50)
DECLARE @strOldVendorName	varchar(50)
DECLARE @strMatlName		varchar(100)
DECLARE @strColor			varchar(40)
DECLARE @strSpec			varchar(100)

DECLARE	@Cnt				int
DECLARE	@Cnt2				int
DECLARE	@strPrNum			varchar(10)
DECLARE	@strCnt				varchar(10)
DECLARE	@strCnt2			varchar(10)

DECLARE @UseQty				int
DECLARE @TotUseQty			int
DECLARE @NetQty				float
DECLARE @PoQty				int
DECLARE @TotQty				int
DECLARE @LenNetQty			int
DECLARE @strUseQty			varchar(100)
DECLARE @strOrdCnt			varchar(800)
DECLARE @strTotQty			varchar(100)
DECLARE @strRemark			varchar(200)
DECLARE @nActCon			int
DECLARE @strNeedCnt			varchar(800)
DECLARE @nShortage			int
DECLARE @nOtherQty			int
DECLARE @nErrQty			int
DECLARE @strBVTRemark		varchar(200)
DECLARE @nStockMove			int


set nocount on

set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)
set @strCurrDate = left(@strRegdatetime,8)
set @seq = 0

set @Cnt = 0
set @Cnt2 = 0
set @strVendorCd = ''
set @strOldVendorCd = ''
set @strOVendorCd = ''
set @UseQty = 0
set @TotUseQty = 0
set @strUseQty = ''
set @strOrdCnt = ''
set @strTotQty = ''
set @TotQty = 0
set @PoQty = 0
set @strRemark = ''


UPDATE  KSV_PO_MATLLIST SET  
		PO_CD = @strPoCd + @strUserNo
WHERE (PO_CD = @strPoCd) and pr_num not like '0%' 

DECLARE  @temp_table table( 
	user_id  varchar(20),
	order_cd  varchar(10)
)

DECLARE kspPoMatlListSample_C1 CURSOR FOR
SELECT ORDER_CD
FROM KSV_PO_MEM
WHERE PO_CD = @strPoCd
and po_seq = 1

OPEN	kspPoMatlListSample_C1

FETCH NEXT FROM kspPoMatlListSample_C1
INTO @strOrderCd

WHILE @@FETCH_STATUS = 0
BEGIN
	set @seq = @seq + 1

	INSERT INTO @temp_table VALUES(@strUserNo, @strOrderCd)

	FETCH NEXT FROM kspPoMatlListSample_C1
	INTO @strOrderCd
END

CLOSE	kspPoMatlListSample_C1
DEALLOCATE kspPoMatlListSample_C1


DECLARE kspPoMatlListSample_C11 CURSOR FOR
SELECT  d.vendor_cd, a.matl_cd, c.matl_seq,D.VENDOR_name, B.MATL_NAME, b.color, b.spec ,sum(USE_QTY)
FROM KSV_PO_MRP AS A INNER JOIN 
	KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD INNER JOIN  
	KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ INNER JOIN 
	KCD_VENDOR AS D ON b.VENDOR_CD = D.VENDOR_CD 
WHERE (a.PO_CD = @strPoCd) AND (a.po_seq < 97) AND (a.use_po_type = '1')
GROUP BY D.VENDOR_CD, A.MATL_CD, c.matl_seq, D.VENDOR_name, B.MATL_NAME, b.color, b.spec
ORDER BY D.VENDOR_name, B.MATL_NAME, b.color, b.spec

OPEN	kspPoMatlListSample_C11

FETCH NEXT FROM kspPoMatlListSample_C11
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty

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
	set @strPrNum = @strCnt +'-'+ @strCnt2 

	DECLARE kspPoMatlListSample_C12 CURSOR FOR
	select    order_cd
	from @temp_table 
	where (user_id = @strUserNo) 
	
	OPEN	kspPoMatlListSample_C12

	FETCH NEXT FROM kspPoMatlListSample_C12
	INTO @strOrderCd

	set @TotQty = 0
	WHILE @@FETCH_STATUS = 0
	BEGIN

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
				set  @strUseQty = '000000' + @strUseQty
			END
		ELSE IF @LenNetQty = 3 
			BEGIN
				set  @strUseQty = '00000' + @strUseQty
			END
		ELSE IF @LenNetQty = 4 
			BEGIN
				set  @strUseQty = '0000' + @strUseQty
			END
		ELSE IF @LenNetQty = 5 
			BEGIN
				set  @strUseQty = '000' + @strUseQty
			END
		ELSE IF @LenNetQty = 6 
			BEGIN
				set  @strUseQty = '00' + @strUseQty
			END
		ELSE IF @LenNetQty = 7 
			BEGIN
				set  @strUseQty = '0' + @strUseQty
			END			

		set @strOrdCnt = @strOrdCnt + @strUseQty



		FETCH NEXT FROM kspPoMatlListSample_C12
		INTO @strOrderCd

	END	

	set @strTotQty = @TotQty

	CLOSE kspPoMatlListSample_C12
	DEALLOCATE kspPoMatlListSample_C12

	INSERT INTO  KSV_PO_MATLLIST (PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, REG_USER, REG_DATETIME ) 
	 VALUES ( @strPoCd, @strVendorCd, @strPrNum, @strMatlCd, @MatlSeq, @strTotQty, @strOrdCnt, @strUserNo , @strRegdatetime) 				


	set @strOrdCnt = ''
	set @Cnt2 = @Cnt2 + 1
	set @TotQty = 0


FETCH NEXT FROM kspPoMatlListSample_C11
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty


END

CLOSE	kspPoMatlListSample_C11
DEALLOCATE kspPoMatlListSample_C11



DECLARE kspPoMatlListSample_C21 CURSOR FOR
SELECT  d.vendor_cd, a.matl_cd, c.matl_seq,D.VENDOR_name, B.MATL_NAME, b.color, b.spec ,sum(USE_QTY)
FROM KSV_PO_MRP AS A INNER JOIN 
	KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD INNER JOIN  
	KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ INNER JOIN 
	KCD_VENDOR AS D ON b.VENDOR_CD = D.VENDOR_CD 
WHERE (a.PO_CD = @strPoCd) AND (a.po_seq < 97) AND (a.use_po_type = '2') 
GROUP BY D.VENDOR_CD, A.MATL_CD, c.matl_seq, D.VENDOR_name, B.MATL_NAME, b.color, b.spec
ORDER BY D.VENDOR_name, B.MATL_NAME, b.color, b.spec

OPEN	kspPoMatlListSample_C21

FETCH NEXT FROM kspPoMatlListSample_C21
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty

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
	set @strPrNum = 'SS'+ @strCnt +'-'+ @strCnt2 

	DECLARE kspPoMatlListSample_C22 CURSOR FOR
	select    order_cd
	from @temp_table 
	where (user_id = @strUserNo) 
	
	OPEN	kspPoMatlListSample_C22

	FETCH NEXT FROM kspPoMatlListSample_C22
	INTO @strOrderCd

	set @TotQty = 0
	WHILE @@FETCH_STATUS = 0
	BEGIN

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
				set  @strUseQty = '000000' + @strUseQty
			END
		ELSE IF @LenNetQty = 3 
			BEGIN
				set  @strUseQty = '00000' + @strUseQty
			END
		ELSE IF @LenNetQty = 4 
			BEGIN
				set  @strUseQty = '0000' + @strUseQty
			END
		ELSE IF @LenNetQty = 5 
			BEGIN
				set  @strUseQty = '000' + @strUseQty
			END
		ELSE IF @LenNetQty = 6 
			BEGIN
				set  @strUseQty = '00' + @strUseQty
			END
		ELSE IF @LenNetQty = 7 
			BEGIN
				set  @strUseQty = '0' + @strUseQty
			END						

		set @strOrdCnt = @strOrdCnt + @strUseQty



		FETCH NEXT FROM kspPoMatlListSample_C22
		INTO @strOrderCd

	END	

	set @strTotQty = @TotQty

	CLOSE kspPoMatlListSample_C22
	DEALLOCATE kspPoMatlListSample_C22

	INSERT INTO  KSV_PO_MATLLIST (PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, stock_qty, REG_USER, REG_DATETIME ) 
	 VALUES ( @strPoCd, @strVendorCd, @strPrNum, @strMatlCd, @MatlSeq, @strTotQty, @strOrdCnt, @strTotQty, @strUserNo , @strRegdatetime) 				


	set @strOrdCnt = ''
	set @Cnt2 = @Cnt2 + 1
	set @TotQty = 0


FETCH NEXT FROM kspPoMatlListSample_C21
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty


END

CLOSE	kspPoMatlListSample_C21
DEALLOCATE kspPoMatlListSample_C21


DECLARE kspPoMatlListSample_C3 CURSOR FOR
SELECT  pr_num, matl_cd, remark, other_qty, err_qty, act_con, shortage, need_cnt, remark_bvt, stock_move
FROM KSV_PO_MATLLIST 
WHERE (PO_CD = @strPoCd + @strUserNo ) 

OPEN	kspPoMatlListSample_C3

FETCH NEXT FROM kspPoMatlListSample_C3
INTO @strPrNum, @strMatlCd, @strRemark, @nOtherQty, @nErrQty, @nActCon, @nShortage, @strNeedCnt, @strBVTRemark, @nStockMove

WHILE @@FETCH_STATUS = 0
BEGIN

	update KSV_PO_MATLLIST  set 
		remark = @strRemark,
		other_qty = @nOtherQty,
		err_qty = @nErrQty,
		act_con = @nActCon,
		shortage = @nShortage,
		need_cnt = @strNeedCnt,
		stock_move = @nStockMove,
		remark_bvt = @strBVTRemark
	WHERE PO_CD = @strPoCd AND pr_num = @strPrNum

	FETCH NEXT FROM kspPoMatlListSample_C3
	INTO @strPrNum, @strMatlCd, @strRemark, @nOtherQty, @nErrQty, @nActCon, @nShortage, @strNeedCnt,@strBVTRemark, @nStockMove

END

CLOSE kspPoMatlListSample_C3
DEALLOCATE kspPoMatlListSample_C3


DELETE FROM  KSV_PO_MATLLIST 
WHERE PO_CD = @strPoCd + @strUserNo





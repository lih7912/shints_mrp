
CREATE PROC [dbo].[kspPoMatlListAdjust]
	@strPoCd	varchar(10),
	@strUserNo	varchar(10)
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
DECLARE	@Cnt3				int
DECLARE	@strPrNum			varchar(10)
DECLARE	@strCnt				varchar(10)
DECLARE	@strCnt2			varchar(10)

DECLARE @UseQty				int
DECLARE @TotUseQty			int
DECLARE @NetQty				float
DECLARE @NetQty2			float
DECLARE @PoQty				int
DECLARE @TotQty				int
DECLARE @LenNetQty			int
DECLARE @strUseQty			varchar(100)
DECLARE @strOrdCnt			varchar(800)
DECLARE @strTotQty			varchar(10)
DECLARE @strRemark			varchar(200)
DECLARE @strBVTRemark		varchar(200)
DECLARE @nActCon			int
DECLARE @nOtherQty			int
DECLARE @nErrQty			int
DECLARE @strOrdCd			varchar(10)
DECLARE @strExpDate			varchar(8)
DECLARE @strEtd				varchar(8)
DECLARE @strEta				varchar(8)
DECLARE @strDelivery		varchar(50)
DECLARE @strUpdUser			varchar(20)
DECLARE @strUpdDatetime		varchar(14)

DECLARE @strPoMatlCd		varchar(10)
DECLARE @PoMatlCdQty		float
DECLARE @strNeedCnt			varchar(800)
DECLARE @nShortage			int
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
set @strBVTRemark = ''
set @strPoMatlCd = ''
set @NetQty = 0
set @NetQty2 = 0
set @PoMatlCdQty = 0
set @Cnt3 = 0

UPDATE  KSV_PO_MATLLIST SET  
		PO_CD = @strPoCd + @strUserNo
WHERE (PO_CD = @strPoCd) and pr_num not like '0%' 

DECLARE  @temp_table table( 
	user_id  varchar(20),
	order_cd  varchar(10)
)

DECLARE kspPoMatlListAdjust_C1 CURSOR FOR
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

OPEN	kspPoMatlListAdjust_C1

FETCH NEXT FROM kspPoMatlListAdjust_C1
INTO @strOrderCd

WHILE @@FETCH_STATUS = 0
BEGIN
	set @seq = @seq + 1

	INSERT INTO @temp_table VALUES(@strUserNo, @strOrderCd)

	FETCH NEXT FROM kspPoMatlListAdjust_C1
	INTO @strOrderCd

END

CLOSE	kspPoMatlListAdjust_C1
DEALLOCATE kspPoMatlListAdjust_C1

DECLARE kspPoMatlListAdjust_C1 CURSOR FOR
SELECT  b.vendor_cd, a.matl_cd, c.matl_seq,D.VENDOR_name, B.MATL_NAME, b.color, b.spec
FROM KSV_PO_MRP AS A INNER JOIN 
	KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD INNER JOIN  
	KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ INNER JOIN 
	KCD_VENDOR AS D ON b.VENDOR_CD = D.VENDOR_CD 
WHERE (a.PO_CD = @strPoCd) and b.matl_type <> 'Z' and a.po_seq < 100 and a.use_po_type =1 --다시 제자리로 and a.use_po_type =1--20100702 김미라대리님 요청 재고자재 없애기 20100920 재고자재 빼기
GROUP BY b.VENDOR_CD, A.MATL_CD, c.matl_seq, D.VENDOR_name, B.MATL_NAME, b.color, b.spec
ORDER BY D.VENDOR_name, B.MATL_NAME, b.color, b.spec

OPEN	kspPoMatlListAdjust_C1

FETCH NEXT FROM kspPoMatlListAdjust_C1
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec

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
--	IF (@strVendorCd <> @strOldVendorCd)
	set @strPrNum = @strCnt +'-'+ @strCnt2 

	DECLARE kspPoMatlListAdjust_C2 CURSOR FOR
	select    order_cd
	from @temp_table 
	where (user_id = @strUserNo) 
	
	OPEN	kspPoMatlListAdjust_C2

	FETCH NEXT FROM kspPoMatlListAdjust_C2
	INTO @strOrderCd

	WHILE @@FETCH_STATUS = 0
	BEGIN

		set @UseQty = 0
		set @PoMatlCdQty = 0
		set @Cnt3 = 0


			DECLARE kspPoMatlListAdjust_C3_stock CURSOR FOR
			SELECT  a.po_matl_cd 
			FROM    KSV_PO_MRP AS A INNER JOIN 
					KCD_MATL_MEM AS C ON A.MATL_SEQ = C.MATL_SEQ AND A.MATL_CD = C.MATL_CD 
			WHERE (a.PO_CD = @strPoCd) AND (a.ORDER_CD = @strOrderCd) AND (a.MATL_CD = @strMatlCd) and a.po_seq < 100 and a.use_po_type =1 and a.po_matl_cd = '재고발주'
			GROUP BY a.MATL_CD, a.PO_CD, a.po_matl_cd

			OPEN	kspPoMatlListAdjust_C3_stock
		
			FETCH NEXT FROM kspPoMatlListAdjust_C3_stock
			INTO @strPoMatlCd

			WHILE @@FETCH_STATUS = 0
			BEGIN
		
			IF (@strPoMatlCd = '재고발주')
				BEGIN
					DECLARE kspPoMatlListAdjust_C3_1 CURSOR FOR
					SELECT  SUM(a.po_QTY) 
					FROM    KSV_PO_MRP AS A INNER JOIN 
							KCD_MATL_MEM AS C ON A.MATL_SEQ = C.MATL_SEQ AND A.MATL_CD = C.MATL_CD 
					WHERE (a.PO_CD = @strPoCd) AND (a.ORDER_CD = @strOrderCd) AND (a.PO_MATL_CD = @strMatlCd) and a.po_seq < 100
					GROUP BY a.PO_CD  

					OPEN	kspPoMatlListAdjust_C3_1
				
					FETCH NEXT FROM kspPoMatlListAdjust_C3_1
					INTO @PoMatlCdQty

					WHILE @@FETCH_STATUS = 0
					BEGIN
--						set @NetQty = @NetQty + @PoMatlCdQty

						FETCH NEXT FROM kspPoMatlListAdjust_C3_1
						INTO @PoMatlCdQty
					END

					CLOSE kspPoMatlListAdjust_C3_1
					DEALLOCATE kspPoMatlListAdjust_C3_1
				END

				FETCH NEXT FROM kspPoMatlListAdjust_C3_stock
				INTO @strPoMatlCd

			END

			CLOSE kspPoMatlListAdjust_C3_stock
			DEALLOCATE kspPoMatlListAdjust_C3_stock



		DECLARE kspPoMatlListAdjust_C3 CURSOR FOR
		SELECT  SUM(a.po_QTY),count(a.po_QTY)
		FROM    KSV_PO_MRP AS A INNER JOIN 
				KCD_MATL_MEM AS C ON A.MATL_SEQ = C.MATL_SEQ AND A.MATL_CD = C.MATL_CD 
		WHERE (a.PO_CD = @strPoCd) AND (a.ORDER_CD = @strOrderCd) AND (a.MATL_CD = @strMatlCd) and a.po_seq < 100 and a.use_po_type =1
		GROUP BY a.MATL_CD, a.PO_CD

		OPEN	kspPoMatlListAdjust_C3
	
		FETCH NEXT FROM kspPoMatlListAdjust_C3
		INTO @NetQty,@Cnt3

		WHILE @@FETCH_STATUS = 0
		BEGIN
			set @NetQty = @NetQty + @PoMatlCdQty
			set @UseQty = round(@NetQty +0.4999,0,0)

			FETCH NEXT FROM kspPoMatlListAdjust_C3
			INTO @NetQty,@Cnt3

		END

		CLOSE kspPoMatlListAdjust_C3
		DEALLOCATE kspPoMatlListAdjust_C3

		set @TotQty = @TotQty + @UseQty
		set @LenNetQty = LEN(@UseQty)
		set @strUseQty = @UseQty
		
		IF @LenNetQty = 1
			BEGIN
				IF @UseQty = 0
					BEGIN
						IF @Cnt3 = 0
							BEGIN
								set @strUseQty = '________'
							END
						ELSE
							BEGIN
								set @strUseQty = '0000000' + @strUseQty
							END
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

		FETCH NEXT FROM kspPoMatlListAdjust_C2
		INTO @strOrderCd

	END	

	set @strTotQty = @TotQty

	CLOSE kspPoMatlListAdjust_C2
	DEALLOCATE kspPoMatlListAdjust_C2

	INSERT INTO  KSV_PO_MATLLIST (PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, REG_USER, REG_DATETIME ) 
	 VALUES ( @strPoCd, @strVendorCd, @strPrNum, @strMatlCd, @MatlSeq, @strTotQty, @strOrdCnt, @strUserNo , @strRegdatetime) 				


	set @strOrdCnt = ''
	set @Cnt2 = @Cnt2 + 1
	set @TotQty = 0


FETCH NEXT FROM kspPoMatlListAdjust_C1
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec


END

CLOSE	kspPoMatlListAdjust_C1
DEALLOCATE kspPoMatlListAdjust_C1


--단품

BEGIN
	set @Cnt = 0
	set @Cnt2 = 0
	set @Cnt3 = 0
END

DECLARE kspPoMatlListAdjust_C21 CURSOR FOR
SELECT  d.vendor_cd, a.matl_cd, c.matl_seq,D.VENDOR_name, B.MATL_NAME, b.color, b.spec ,sum(USE_QTY)
FROM KSV_PO_MRP AS A INNER JOIN 
	KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD INNER JOIN  
	KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ INNER JOIN 
	KCD_VENDOR AS D ON b.VENDOR_CD = D.VENDOR_CD 
WHERE (a.PO_CD = @strPoCd) AND (a.po_seq > 100) AND (a.use_po_type = '1') and b.matl_type <> 'Z'
GROUP BY D.VENDOR_CD, A.MATL_CD, c.matl_seq, D.VENDOR_name, B.MATL_NAME, b.color, b.spec
ORDER BY D.VENDOR_name, B.MATL_NAME, b.color, b.spec

OPEN	kspPoMatlListAdjust_C21

FETCH NEXT FROM kspPoMatlListAdjust_C21
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
	set @strPrNum = 'AM'+ @strCnt +'-'+ @strCnt2 

	DECLARE kspPoMatlListAdjust_C22 CURSOR FOR
	select    order_cd
	from @temp_table 
	where (user_id = @strUserNo) 
	
	OPEN	kspPoMatlListAdjust_C22

	FETCH NEXT FROM kspPoMatlListAdjust_C22
	INTO @strOrderCd

	set @TotQty = 0
	WHILE @@FETCH_STATUS = 0
	BEGIN

		set @UseQty = 0

		DECLARE kspPoMatlListAdjust_C3 CURSOR FOR
		SELECT  SUM(a.use_QTY),count(a.use_QTY) 
		FROM    KSV_PO_MRP AS A INNER JOIN 
				KCD_MATL_MEM AS C ON A.MATL_SEQ = C.MATL_SEQ AND A.MATL_CD = C.MATL_CD 
		WHERE (a.PO_CD = @strPoCd) AND (a.ORDER_CD = @strOrderCd) AND (a.MATL_CD = @strMatlCd) AND (a.po_seq > 100)
		GROUP BY a.MATL_CD, a.PO_CD  

		OPEN	kspPoMatlListAdjust_C3
	
		FETCH NEXT FROM kspPoMatlListAdjust_C3
		INTO @NetQty,@Cnt3

		WHILE @@FETCH_STATUS = 0
		BEGIN

			set @UseQty = round(@NetQty +0.4999,0,0)

			FETCH NEXT FROM kspPoMatlListAdjust_C3
			INTO @NetQty,@Cnt3

		END

		CLOSE kspPoMatlListAdjust_C3
		DEALLOCATE kspPoMatlListAdjust_C3


		set @TotQty = @TotQty + @UseQty
		set @LenNetQty = LEN(@UseQty)
		set @strUseQty = @UseQty
		
		IF @LenNetQty = 1
			BEGIN
				IF @strUseQty = 0
					BEGIN
						IF @Cnt3 > 0
							BEGIN
								set @strUseQty = '0000000' + @strUseQty
							END
						ELSE
							BEGIN
								set @strUseQty = '________'
							END
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



		FETCH NEXT FROM kspPoMatlListAdjust_C22
		INTO @strOrderCd

	END	

	set @strTotQty = @TotQty

	CLOSE kspPoMatlListAdjust_C22
	DEALLOCATE kspPoMatlListAdjust_C22

	INSERT INTO  KSV_PO_MATLLIST (PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, REG_USER, REG_DATETIME ) 
	 VALUES ( @strPoCd, @strVendorCd, @strPrNum, @strMatlCd, @MatlSeq, @strTotQty, @strOrdCnt, @strUserNo , @strRegdatetime) 				


	set @strOrdCnt = ''
	set @Cnt2 = @Cnt2 + 1
	set @TotQty = 0


FETCH NEXT FROM kspPoMatlListAdjust_C21
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty

END

CLOSE kspPoMatlListAdjust_C21
DEALLOCATE kspPoMatlListAdjust_C21

--재고

DECLARE kspPoMatlListAdjust_C31 CURSOR FOR
SELECT  d.vendor_cd, a.matl_cd, c.matl_seq,D.VENDOR_name, B.MATL_NAME, b.color, b.spec ,sum(USE_QTY),a.order_cd 
FROM KSV_PO_MRP AS A INNER JOIN 
	KCD_MATL_MST AS B ON A.MATL_CD = B.MATL_CD INNER JOIN  
	KCD_MATL_MEM AS C ON B.MATL_CD = C.MATL_CD AND A.MATL_SEQ = C.MATL_SEQ INNER JOIN 
	KCD_VENDOR AS D ON b.VENDOR_CD = D.VENDOR_CD 
WHERE (a.PO_CD = @strPoCd) AND (a.po_seq > 100) AND (a.use_po_type = '2') and b.matl_type <> 'Z'
GROUP BY D.VENDOR_CD, A.MATL_CD, c.matl_seq, D.VENDOR_name, B.MATL_NAME, b.color, b.spec,a.order_cd 
ORDER BY D.VENDOR_name, B.MATL_NAME, b.color, b.spec

OPEN	kspPoMatlListAdjust_C31

FETCH NEXT FROM kspPoMatlListAdjust_C31
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty, @strOrdCd

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
	set @strPrNum = 'AS'+ @strCnt +'-'+ @strCnt2 

	DECLARE kspPoMatlListAdjust_C32 CURSOR FOR
	select    order_cd
	from @temp_table 
	where (user_id = @strUserNo) and (order_cd = @strOrdCd)
	
	OPEN	kspPoMatlListAdjust_C32

	FETCH NEXT FROM kspPoMatlListAdjust_C32
	INTO @strOrderCd

	set @TotQty = 0
	WHILE @@FETCH_STATUS = 0
	BEGIN
	
	print @UseQty

		set @TotQty = @TotQty + @UseQty
		set @LenNetQty = LEN(@UseQty)
		set @strUseQty = @UseQty
		
		IF @LenNetQty = 1
			BEGIN
				IF @LenNetQty = '0'
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



		FETCH NEXT FROM kspPoMatlListAdjust_C32
		INTO @strOrderCd

	END	

	set @strTotQty = @TotQty

	CLOSE kspPoMatlListAdjust_C32
	DEALLOCATE kspPoMatlListAdjust_C32

	INSERT INTO  KSV_PO_MATLLIST (PO_CD, VENDOR_CD, PR_NUM, MATL_CD, matl_seq, TOT_CNT, ORD_CNT, stock_qty, REG_USER, REG_DATETIME ) 
	 VALUES ( @strPoCd, @strVendorCd, @strPrNum, @strMatlCd, @MatlSeq, @strTotQty, @strOrdCnt, @strTotQty, @strUserNo , @strRegdatetime) 				


	set @strOrdCnt = ''
	set @Cnt2 = @Cnt2 + 1
	set @TotQty = 0


FETCH NEXT FROM kspPoMatlListAdjust_C31
INTO @strVendorCd, @strMatlCd, @MatlSeq, @strVendorName, @strMatlName, @strColor, @strSpec, @UseQty, @strOrdCd

END

CLOSE kspPoMatlListAdjust_C31
DEALLOCATE kspPoMatlListAdjust_C31

DECLARE kspPoMatlListAdjust_C31 CURSOR FOR
SELECT  PO_MATL_CD, SUM(PO_QTY) AS potoqty
FROM KSV_PO_MRP 
WHERE (PO_CD = @strPoCd) AND (USE_PO_TYPE = '2') AND (DIFF_PO_TYPE <> '2') 
GROUP BY PO_MATL_CD 

OPEN	kspPoMatlListAdjust_C31

FETCH NEXT FROM kspPoMatlListAdjust_C31
INTO @strMatlCd, @PoQty

WHILE @@FETCH_STATUS = 0
BEGIN

	UPDATE KSV_PO_MATLLIST SET stock_qty = @PoQty
	WHERE po_cd = @strPoCd AND matl_cd = @strMatlCd and left(pr_num,1) between '1' and '9'

	FETCH NEXT FROM kspPoMatlListAdjust_C31
	INTO @strMatlCd, @PoQty

END

CLOSE kspPoMatlListAdjust_C31
DEALLOCATE kspPoMatlListAdjust_C31

DECLARE kspPoMatlListAdjust_C41 CURSOR FOR
SELECT  pr_num, matl_cd, remark, other_qty, err_qty, act_con, shortage, need_cnt, remark_bvt, stock_move,
exp_date,etd,eta,delivery,upd_user,upd_datetime
FROM KSV_PO_MATLLIST 
WHERE (PO_CD = @strPoCd + @strUserNo ) 

OPEN	kspPoMatlListAdjust_C41

FETCH NEXT FROM kspPoMatlListAdjust_C41
INTO @strPrNum, @strMatlCd, @strRemark, @nOtherQty, @nErrQty, @nActCon, @nShortage, @strNeedCnt, @strBVTRemark, @nStockMove,
@strExpDate,@strEtd,@strEta,@strDelivery,@strUpdUser,@strUpdDatetime

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
		remark_bvt = @strBVTRemark,
		exp_date = @strExpDate,
		etd = @strEtd,
		eta = @strEta,
		delivery = @strDelivery,
		upd_user = @strUpdUser,
		upd_datetime = @strUpdDatetime
	WHERE PO_CD = @strPoCd AND matl_cd = @strMatlCd

	FETCH NEXT FROM kspPoMatlListAdjust_C41
	INTO @strPrNum, @strMatlCd, @strRemark,@nOtherQty, @nErrQty, @nActCon,  @nShortage, @strNeedCnt, @strBVTRemark, @nStockMove,
	@strExpDate,@strEtd,@strEta,@strDelivery,@strUpdUser,@strUpdDatetime

END

CLOSE kspPoMatlListAdjust_C41
DEALLOCATE kspPoMatlListAdjust_C41


DELETE FROM  KSV_PO_MATLLIST 
WHERE PO_CD = @strPoCd + @strUserNo











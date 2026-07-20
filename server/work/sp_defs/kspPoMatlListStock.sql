
CREATE PROC [dbo].[kspPoMatlListStock]
	@strPoCd	varchar(30),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error				int
DECLARE	@strRegdatetime		varchar(14)
DECLARE	@strCurrDate		varchar(8)
DECLARE	@seq				int
DECLARE @strPoMatlCd		varchar(10)
DECLARE @PoQty				int

set nocount on

set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)
set @strCurrDate = left(@strRegdatetime,8)
set @seq = 0


DECLARE kspPoMatlListStock_C1 CURSOR FOR
SELECT  PO_MATL_CD, SUM(PO_QTY) AS potoqty 
FROM KSV_PO_MRP 
WHERE (PO_CD = @strPoCd) AND (USE_PO_TYPE = '2') AND (DIFF_PO_TYPE <> '2') 
GROUP BY PO_MATL_CD 

OPEN	kspPoMatlListStock_C1

FETCH NEXT FROM kspPoMatlListStock_C1
INTO @strPoMatlCd, @PoQty

WHILE @@FETCH_STATUS = 0
BEGIN
	UPDATE KSV_PO_MATLLIST SET stock_qty = @PoQty 
	WHERE po_cd = @strPoCd AND matl_cd = @strPoMatlCd and left(pr_num,1) between '1' and '9'

	FETCH NEXT FROM kspPoMatlListStock_C1
	INTO @strPoMatlCd, @PoQty
END

CLOSE	kspPoMatlListStock_C1
DEALLOCATE kspPoMatlListStock_C1



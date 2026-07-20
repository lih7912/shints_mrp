
CREATE PROC [dbo].[kspPoMrpAdjCancel]
	@strPoCd	varchar(10),
	@strPoSeq	int
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE @strOrderCd		varchar(20)
DECLARE @strMatlCd		varchar(20)
DECLARE @strMatlSeq		int
DECLARE	@strMrpSeq		int
DECLARE @strOrgPoSeq	int
DECLARE @strDiffPoType	varchar(2)
DECLARE @strDiffQty	    float
DECLARE	@strLastPoSeq	int
DECLARE	@strStockIdx	varchar(20)
DECLARE	@strUseQty		float
DECLARE @strRegDatetime varchar(20)
DECLARE @stockcancel_qty float

set nocount on




-- 재고사용취소처리
DECLARE kspPoMrpCancel_C2 CURSOR FOR
	 select stock_idx,use_qty 
	 from ksv_stock_use 
	 where use_po_cd = @strPoCd
	 and use_po_seq = @strPoSeq 

OPEN kspPoMrpCancel_C2

FETCH NEXT FROM kspPoMrpCancel_C2 INTO @strStockIdx,@strUseQty

WHILE @@FETCH_STATUS = 0
BEGIN
	
	update ksv_stock_matl set 
		remain_qty = remain_qty + @strUseQty,
		use_qty = use_qty - @strUseQty
	where stock_idx = @strStockIdx

    FETCH NEXT FROM kspPoMrpCancel_C2 INTO @strStockIdx,@strUseQty
END

CLOSE kspPoMrpCancel_C2
DEALLOCATE kspPoMrpCancel_C2

delete ksv_stock_use where use_po_cd=@strPoCd and use_po_seq=@strPoSeq


-- 발주조정취소처리
DECLARE kspPoMrpCancel_C1 CURSOR FOR
	 select a.order_cd,a.matl_cd,a.mrp_seq,a.org_po_seq,a.diff_po_type,a.diff_qty,a.stock_idx
	 from ksv_po_mrp a
	 where a.po_cd = @strPoCd 
	 and a.po_seq = @strPoSeq 
	 order by a.diff_po_type

OPEN kspPoMrpCancel_C1

FETCH NEXT FROM kspPoMrpCancel_C1
INTO @strOrderCd,@strMatlCd,@strMrpSeq,@strOrgPoSeq,@strDiffPoType,@strDiffQty,@strStockIdx

set @stockcancel_qty = @strDiffQty * (-1)

WHILE @@FETCH_STATUS = 0
BEGIN
	-- Left Over
	if @strDiffPoType = '1'	
	begin
		delete ksv_stock_matl
		where stock_idx = @strStockIdx
	end
	
	-- cancel stockuse
	if @strDiffPoType = '5'	
	begin
		delete ksv_stock_use
		where stock_idx=@strStockIdx
		and use_po_cd=@strPoCd
		and use_po_seq=@strPoSeq
		and use_order_cd=@strOrderCd
		and use_mrp_seq=@strMrpSeq
		and use_qty=@strDiffQty
		
--		update ksv_stock_matl
--		set remain_qty=remain_qty-@stockcancel_qty, use_qty=use_qty+@stockcancel_qty
--		where stock_idx=@strStockIdx
	end	

	if @strDiffPoType = '2'	
	begin
		update ksv_stock_mem 
		set po_qty=po_qty+@strDiffQty
		where po_cd = @strPoCd
		and po_seq = @strOrgPoSeq
		and order_cd = @strOrderCd
		and matl_cd = @strMatlCd
		and mrp_seq = @strMrpSeq
	end

    FETCH NEXT FROM kspPoMrpCancel_C1
	INTO @strOrderCd,@strMatlCd,@strMrpSeq,@strOrgPoSeq,@strDiffPoType,@strDiffQty,@strStockIdx
END

CLOSE kspPoMrpCancel_C1
DEALLOCATE kspPoMrpCancel_C1

delete from ksv_po_mst where po_cd=@strPoCd and po_seq=@strPoSeq
delete from ksv_po_mem where po_cd=@strPoCd and po_seq=@strPoSeq
delete from ksv_po_mrp where po_cd=@strPoCd and po_seq=@strPoSeq
delete from ksv_stock_mst where po_cd=@strPoCd and po_seq=@strPoSeq
delete from ksv_stock_mem where po_cd=@strPoCd and po_seq=@strPoSeq
delete from ksv_stock_matl where po_cd=@strPoCd and po_seq=@strPoSeq

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END


RETURN














CREATE PROC [dbo].[kspPoMrpListAdjust]
	@strPoCd	varchar(10),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE	@strRegdatetime	varchar(14)
DECLARE @seq			int
DECLARE @strOrderCd		varchar(20)
DECLARE @strProdCd		varchar(20)
DECLARE @strMatlCd		varchar(20)
DECLARE @strUseSize		varchar(20)
DECLARE @strPoQty		float
DECLARE @strNetQty		float
DECLARE @dwUseQty		float
DECLARE @index			int
DECLARE @max			int
DECLARE @sum			int
DECLARE @i				int
DECLARE @strAddFlag		varchar(1)
DECLARE @strNetQty1		float
DECLARE @strNetQty2		float
DECLARE @nNetQty		int
DECLARE @nPoQty			int
DECLARE @nDiff			int

set nocount on


set @strRegdatetime = CONVERT(VARCHAR(8),GETDATE(),112)+SUBSTRING(convert(varchar(8), getdate(), 108),1,2)+SUBSTRING(convert(varchar(8), getdate(), 108),4,2)+SUBSTRING(convert(varchar(8), getdate(), 108),7,2)

delete ksv_po_mrplist 
where po_cd = @strPoCd 

insert into ksv_po_mrplist 
 (po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime)
select  po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime
from ksv_po_mrpnettemp
where user_id = @strUserNo   
and po_cd = @strPoCd   

DECLARE kspPoMrpNet_C1 CURSOR FOR
	 select a.po_cd,a.order_cd,a.matl_cd,sum(a.net_qty)
	 from ksv_po_mrplist a
	 where a.po_cd = @strPoCd 
	 group by a.po_cd,a.order_cd,a.matl_cd

OPEN kspPoMrpNet_C1

FETCH NEXT FROM kspPoMrpNet_C1
INTO @strPoCd,@strOrderCd,@strMatlCd,@strNetQty

WHILE @@FETCH_STATUS = 0
BEGIN
	set @strPoQty = ( select sum(po_qty)
						from ksv_po_mrp 
						where po_cd = @strPoCd 
						and order_cd = @strOrderCd 
						and matl_cd = @strMatlCd 
						and po_seq < 100
						and diff_po_type in ('0','1','3','4')
					  )

	set @nNetQty = Round(@strNetQty+0.4999,0,0)
	set @nPoQty = Round(@strPoQty+0.4999,0,0)
	set @nDiff = @nPoQty - @nNetQty 
	set @strAddFlag = '0'

	--	print '@strOrderCd=' + @strOrderCd
	--	print '@strMatlCd=' + @strMatlCd
	--	print '@strUseSize=' + @strUseSize
	--	print '@nNetQty=' + cast(@nNetQty as varchar)
	--	print '@nPoQty=' + cast(@nPoQty as varchar)
	--	print '@nDiff=' + cast(@nDiff as varchar)

	if @nDiff <> 0
	begin
		set @strProdCd = ( select top 1 prod_cd
						   from ksv_po_mrplist
						   where po_cd = @strPoCd 
						   and order_cd = @strOrderCd 
						   and add_flag= @strAddFlag 
						   and matl_cd = @strMatlCd 
					 )


		insert into ksv_po_mrplist
		 (po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
		  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime) 
		select top 1
		  po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,'',remark,
		  net,loss,gross,vendor_cd,0,@nDiff,round(@nDiff+0.4999,0,0),status_cd,reg_user,reg_datetime		 
		from ksv_po_mrplist 
	    where po_cd = @strPoCd 
	    and order_cd = @strOrderCd 
	    and prod_cd = @strProdCd 
	    and add_flag= @strAddFlag 
	    and matl_cd = @strMatlCd 

	end

    FETCH NEXT FROM kspPoMrpNet_C1
    INTO @strPoCd,@strOrderCd,@strMatlCd,@strNetQty
END

CLOSE kspPoMrpNet_C1
DEALLOCATE kspPoMrpNet_C1

DECLARE kspPoMrpNet_C2 CURSOR FOR
	 select a.po_cd,a.order_cd,a.matl_cd,a.po_qty
	 from ksv_po_mrp a
	 where a.po_cd = @strPoCd 
	 and a.diff_po_type = '1'
	 and a.matl_cd not in (select matl_cd from ksv_po_mrplist
							where po_cd = a.po_cd
							and order_cd = a.order_cd
						  )

OPEN kspPoMrpNet_C2

FETCH NEXT FROM kspPoMrpNet_C2
INTO @strPoCd,@strOrderCd,@strMatlCd,@strPoQty

WHILE @@FETCH_STATUS = 0
BEGIN
	set @strProdCd = ( select top 1 prod_cd
					   from ksv_po_mrplist
					   where po_cd = @strPoCd 
					   and order_cd = @strOrderCd 
					   and add_flag= @strAddFlag 
					   and matl_cd = @strMatlCd 
					 )
	set @strAddFlag = '0'

	insert into ksv_po_mrplist
	 (po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
	  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime) 
	select
	  a.po_cd,a.order_cd,@strProdCd,@strAddFlag,a.matl_cd,a.matl_seq,0,'','',
	  0,0,0,b.vendor_cd,0,a.po_qty,a.use_qty,'0',@strUserNo,@strRegdatetime		 
	from ksv_po_mrp a, kcd_matl_mst b
	where a.po_cd = @strPoCd 
	and a.order_cd = @strOrderCd 
	and a.matl_cd = @strMatlCd 
	and b.matl_cd = a.matl_cd

    FETCH NEXT FROM kspPoMrpNet_C2
    INTO @strPoCd,@strOrderCd,@strMatlCd,@strNetQty
END

CLOSE kspPoMrpNet_C2
DEALLOCATE kspPoMrpNet_C2

select	@Error = @@ERROR

if @Error != 0
BEGIN
	return @Error
END

RETURN








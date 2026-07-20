


CREATE PROC [dbo].[kspPoMrpList]
	@strPoCd	varchar(10),
	@strUserNo	varchar(20)
WITH RECOMPILE AS

delete ksv_po_mrplist 
where po_cd = @strPoCd 

insert into ksv_po_mrplist 
 (po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime)
select  po_cd,order_cd,prod_cd,add_flag,matl_cd,matl_seq,prod_seq,use_size,remark,
  net,loss,gross,vendor_cd,ord_cnt,net_qty,use_qty,status_cd,reg_user,reg_datetime
from ksv_po_mrpnet
where po_cd = @strPoCd   
 

RETURN






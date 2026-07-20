/*
S0301_MATL_RECORD performance indexes (SQL Server)
Run in target DB after validating table/column names.
*/

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_kcd_matl_mem_matl_cd_matl_seq_desc'
      AND object_id = OBJECT_ID('dbo.kcd_matl_mem')
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_kcd_matl_mem_matl_cd_matl_seq_desc
    ON dbo.kcd_matl_mem (matl_cd ASC, matl_seq DESC)
    INCLUDE (matl_price, curr_cd, upd_user, reg_datetime, price_type);
END
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_kcd_matl_sale_matl_cd_matl_seq_desc'
      AND object_id = OBJECT_ID('dbo.kcd_matl_sale')
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_kcd_matl_sale_matl_cd_matl_seq_desc
    ON dbo.kcd_matl_sale (matl_cd ASC, matl_seq DESC)
    INCLUDE (matl_price, curr_cd);
END
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_kcd_matl_update_remark_matl_cd_id_desc'
      AND object_id = OBJECT_ID('dbo.kcd_matl_update_remark')
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_kcd_matl_update_remark_matl_cd_id_desc
    ON dbo.kcd_matl_update_remark (matl_cd ASC, id DESC)
    INCLUDE (update_remark);
END
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_kcd_matl_mst_vendor_type_reg'
      AND object_id = OBJECT_ID('dbo.kcd_matl_mst')
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_kcd_matl_mst_vendor_type_reg
    ON dbo.kcd_matl_mst (vendor_cd ASC, matl_type ASC, reg_datetime ASC)
    INCLUDE (matl_cd, matl_name, color, spec, status_cd, unit, box_unit, matl_type2);
END
GO

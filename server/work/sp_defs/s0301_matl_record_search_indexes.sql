/*
  S0301 Search(S) performance indexes
  Target query:
  - server/src/dblib3/S0301_MATL_RECORD/S0301_MATL_RECORD_TBL_KCD_MATL_MST.queries.ts

  Compatibility mode:
  - No IF / IF EXISTS keyword
  - No GO batch separator
  - DROP is wrapped in TRY/CATCH so missing index does not fail execution
*/

/* 1) Latest row lookup for kcd_matl_mem */
BEGIN TRY
  DROP INDEX IX_kcd_matl_mem_matl_cd_matl_seq_desc ON dbo.kcd_matl_mem;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_matl_mem_matl_cd_matl_seq_desc
ON dbo.kcd_matl_mem (matl_cd ASC, matl_seq DESC)
INCLUDE (matl_price, upd_user, curr_cd, reg_datetime, price_type);

/* 2) Latest row lookup for kcd_matl_sale */
BEGIN TRY
  DROP INDEX IX_kcd_matl_sale_matl_cd_matl_seq_desc ON dbo.kcd_matl_sale;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_matl_sale_matl_cd_matl_seq_desc
ON dbo.kcd_matl_sale (matl_cd ASC, matl_seq DESC)
INCLUDE (matl_price, curr_cd);

/* 3) Main filter/join table: kcd_matl_mst */
BEGIN TRY
  DROP INDEX IX_kcd_matl_mst_vendor_type_status ON dbo.kcd_matl_mst;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_matl_mst_vendor_type_status
ON dbo.kcd_matl_mst (vendor_cd ASC, matl_type ASC, status_cd ASC, matl_type2 ASC, matl_cd ASC)
INCLUDE (id, matl_name, color, spec, unit, box_unit, hs_cd, add_amt, add_loss, reg_datetime);

BEGIN TRY
  DROP INDEX IX_kcd_matl_mst_reg_datetime_type ON dbo.kcd_matl_mst;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_matl_mst_reg_datetime_type
ON dbo.kcd_matl_mst (reg_datetime ASC, matl_type ASC, matl_type2 ASC, vendor_cd ASC, matl_cd ASC)
INCLUDE (id, matl_name, color, spec, unit, box_unit, hs_cd, add_amt, add_loss, status_cd);

/* 4) Code table lookups */
BEGIN TRY
  DROP INDEX IX_kcd_code_group_code ON dbo.kcd_code;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_code_group_code
ON dbo.kcd_code (cd_group ASC, cd_code ASC)
INCLUDE (cd_name);

/* 5) Material type2 lookup */
BEGIN TRY
  DROP INDEX IX_kcd_matl_type2_seq ON dbo.kcd_matl_type2;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_matl_type2_seq
ON dbo.kcd_matl_type2 (seq ASC)
INCLUDE (matl_type2);

/* 6) Composition joins */
BEGIN TRY
  DROP INDEX IX_kcd_composition_matl_name ON dbo.kcd_composition;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_composition_matl_name
ON dbo.kcd_composition (matl_name ASC)
INCLUDE (comp1, comp1_percent, comp2, comp2_percent, comp3, comp3_percent, comp4, comp4_percent);

BEGIN TRY
  DROP INDEX IX_kcd_composition_v_matl_name ON dbo.kcd_composition_v;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_composition_v_matl_name
ON dbo.kcd_composition_v (matl_name ASC)
INCLUDE (comp1);

BEGIN TRY
  DROP INDEX IX_kcd_offer_spec_matl_name_vendor_cd ON dbo.kcd_offer_spec;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_offer_spec_matl_name_vendor_cd
ON dbo.kcd_offer_spec (matl_name ASC, vendor_cd ASC)
INCLUDE (offer_spec);

/* 7) Optional: vendor search helper */
BEGIN TRY
  DROP INDEX IX_kcd_vendor_vendor_cd_name ON dbo.kcd_vendor;
END TRY
BEGIN CATCH
END CATCH;
CREATE NONCLUSTERED INDEX IX_kcd_vendor_vendor_cd_name
ON dbo.kcd_vendor (vendor_cd ASC)
INCLUDE (vendor_name, vendor_type, status_cd);

/*
  Post-deploy verification:
  SET STATISTICS IO, TIME ON;
  -- run Search(S) query once
  SET STATISTICS IO, TIME OFF;
*/

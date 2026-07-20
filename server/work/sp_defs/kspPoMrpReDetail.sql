
CREATE PROC [dbo].[kspPoMrpReDetail]
	@po_cd	varchar(10),
	@user_id	varchar(20)
WITH RECOMPILE AS

DECLARE	@Error			int
DECLARE	@seq			int
DECLARE	@po_seq			int
DECLARE @order_cd		varchar(20)
DECLARE @matl_cd		varchar(20)
DECLARE @mrp_seq		int
DECLARE @bef_po_qty		float
DECLARE @new_qty		float
DECLARE @bef_qty		float
DECLARE @diff_qty		float
DECLARE @stock_qty		float
DECLARE @diff_po_type	varchar(20)
DECLARE	@matl_seq		int
DECLARE @matl_price		float
DECLARE @curr_cd		varchar(20)
DECLARE @tot_amt		float
DECLARE @use_size		varchar(20)

DECLARE @diff_re_type	varchar(20)
DECLARE @diff_re_qty	float
DECLARE @cancel_qty		float
DECLARE @cancel_qty2		float
DECLARE @stockcancel_qty	float
DECLARE @remain_qty		float
DECLARE @input_qty		float
DECLARE @leftover_qty	float

DECLARE	@po_seq2		int
DECLARE @order_cd2		varchar(20)
DECLARE @matl_cd2		varchar(20)
DECLARE @mrp_seq2		int
DECLARE @mrp_seq3		int
DECLARE @po_qty2		float
DECLARE @stock_idx		varchar(20)
DECLARE @root_idx		varchar(20)
DECLARE @factory_cd		varchar(10)
DECLARE @po_matl_cd		varchar(10)

DECLARE @bef_stock_qty	float

DECLARE @PoRemain		float
DECLARE @temp_qty		float

set nocount on

delete ksv_po_mrptempre_detail 
where user_id = @user_id 



DECLARE kspPoMrpRe_C1 CURSOR FOR
	 select seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,new_qty,bef_qty,diff_qty,stock_qty,diff_po_type,
			matl_seq,matl_price,curr_cd,tot_amt,use_size
	 from ksv_po_mrptempre
	 where user_id = @user_id 
	 and po_cd =@po_cd
	 and new_qty <> bef_qty + stock_qty
	 order by seq

OPEN kspPoMrpRe_C1

FETCH NEXT FROM kspPoMrpRe_C1
INTO @seq,@po_cd,@po_seq,@order_cd,@matl_cd,@mrp_seq,@new_qty,@bef_qty,@diff_qty,@stock_qty,@diff_po_type,
	 @matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size


WHILE @@FETCH_STATUS = 0
BEGIN
	--DIFF_RE_TYPE	1	Left over
	--DIFF_RE_TYPE	2	Cancel po
	--DIFF_RE_TYPE	3	Add
	--DIFF_RE_TYPE	5	Cancel StockUse

	PRINT @order_cd + ' ' + @matl_cd + ' '
	


	-- 초과발주
	if @diff_po_type = '3' 
	begin
	    set @diff_re_type = '3'
		set @diff_re_qty = @diff_qty

		insert into ksv_po_mrptempre_detail
		 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,diff_re_type,diff_re_qty,
		  matl_seq,matl_price,curr_cd,tot_amt,use_size,bef_po_qty,use_stock_qty)
		 values (
		  @user_id,@seq,@po_cd,@po_seq,@order_cd,@matl_cd,@mrp_seq,@diff_re_type,@diff_re_qty,
		  @matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size,0,0) 
	end
	-- 발주취소
	else
	begin
	
					-- 입고가 있을 경우 입고수량이 발주수량보다 크면 남는 수량 재고전환
						select @input_qty = isnull(sum(in_qty),0) 
						from ksv_stock_in
						where po_cd = @po_cd and matl_cd = @matl_cd and order_cd = @order_cd

					-- 이전 차수에서 left over 된것 가져와서 빼주기		
						select @bef_stock_qty = isnull(sum(po_qty),0) 
						from ksv_po_mrp
						where po_cd = @po_cd and matl_cd = @matl_cd and order_cd = @order_cd and mrp_seq = @mrp_seq	and diff_po_type='1'	
	

	
		set @cancel_qty = @diff_qty * (-1) 
		print '1  ' + cast(@cancel_qty as varchar)
		
		set @PoRemain = @bef_qty-@input_qty
		print 'remain  ' + cast(@PoRemain as varchar)	--209	
		print 'poqty  ' + cast(@bef_qty as varchar)	-- 166
		print 'input  ' + cast(@input_qty as varchar)	--375
		print '@cancel_qty' + cast(@cancel_qty as varchar)

-- 발주수량에서 먼저 취소		

		if @PoRemain > 0
		begin
			if @cancel_qty >= @PoRemain
				set @temp_qty = @PoRemain
			else
				set @temp_qty = @cancel_qty
				
			
			DECLARE kspPoMrpRe_C3 CURSOR FOR
					select a.po_seq,a.po_qty,a.mrp_seq
					from ksv_po_mrp a
					where a.po_cd = @po_cd 
					and a.po_seq < 97
					and a.order_cd = @order_cd
					and a.matl_cd = @matl_cd
					and a.use_po_type = '1'
					and a.po_qty > 0
					order by a.po_seq desc		
					
			OPEN kspPoMrpRe_C3

			FETCH NEXT FROM kspPoMrpRe_C3
			INTO @po_seq2,@po_qty2,@mrp_seq2

			WHILE @@FETCH_STATUS = 0
			BEGIN
				set @diff_re_type = '2' -- 그냥 '2'로

				if @temp_qty > @po_qty2
					set @diff_re_qty = @po_qty2 * (-1)
				else 
					set @diff_re_qty = @temp_qty * (-1)			
					
				insert into ksv_po_mrptempre_detail
				 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,diff_re_type,diff_re_qty,
				  matl_seq,matl_price,curr_cd,tot_amt,use_size,bef_po_qty,use_stock_qty,org_po_seq)
				 values (
				  @user_id,@seq,@po_cd,@po_seq,@order_cd,@matl_cd,@mrp_seq2,@diff_re_type,@diff_re_qty,
				  @matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size,@po_qty2,0,@po_seq2) 					
				  
				set @cancel_qty = @cancel_qty - @po_qty2
				set @temp_qty = @temp_qty - @po_qty2
				
				print 'temp qty  '+ cast(@temp_qty as varchar)
				print 'po qty2  '+ cast(@po_qty2 as varchar)
				
				if @temp_qty < = 0
				begin
					set @cancel_qty = (@diff_qty * (-1))-(@bef_qty-@input_qty)
					print 'bef qty  ' + cast(@bef_qty as varchar)
					print 'diff qty  ' + cast(@diff_qty as varchar)
					print 'remain cancel  ' + cast(@cancel_qty as varchar)
					break			
				end 				
				FETCH NEXT FROM kspPoMrpRe_C3
				INTO @po_seq2,@po_qty2,@mrp_seq2
			END

			CLOSE kspPoMrpRe_C3
			DEALLOCATE kspPoMrpRe_C3
		
		end
		
print 'slkdf cancel ' + cast(@cancel_qty as varchar)			
	if @input_qty > 0
		begin		
-- 남은 Left over 작업		
		if @cancel_qty > 0
		begin
			if @bef_qty > @cancel_qty
				set @remain_qty = @cancel_qty 
			else 
				set @remain_qty = @bef_qty 
				
			DECLARE kspPoMrpRe_C3 CURSOR FOR
					select a.po_seq,a.po_qty,a.mrp_seq
					from ksv_po_mrp a
					where a.po_cd = @po_cd 
					and a.po_seq < 97
					and a.order_cd = @order_cd
					and a.matl_cd = @matl_cd
					and a.use_po_type = '1'
					and a.po_qty > 0
					order by a.po_seq desc

			OPEN kspPoMrpRe_C3

			FETCH NEXT FROM kspPoMrpRe_C3
			INTO @po_seq2,@po_qty2,@mrp_seq2

			WHILE @@FETCH_STATUS = 0
			BEGIN
				if @remain_qty < = 0
					break
					
				set @diff_re_type = '9' -- '2'인데 임시로 leftover처리때문에 '9'로 세팅

				if @remain_qty > @po_qty2
					set @diff_re_qty = @po_qty2 * (-1)
				else 
					set @diff_re_qty = @remain_qty * (-1)

			
				insert into ksv_po_mrptempre_detail
				 (user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,diff_re_type,diff_re_qty,
				  matl_seq,matl_price,curr_cd,tot_amt,use_size,bef_po_qty,use_stock_qty,org_po_seq)
				 values (
				  @user_id,@seq,@po_cd,@po_seq,@order_cd,@matl_cd,@mrp_seq2,@diff_re_type,@diff_re_qty,
				  @matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size,@po_qty2,0,@po_seq2) 
			
				set @remain_qty = @remain_qty - @po_qty2					
				
				set @cancel_qty = @cancel_qty - @po_qty2
--				set @cancel_qty = @cancel_qty - @diff_re_qty				
				
				set @cancel_qty2 = @diff_qty * (-1) 
				
				if @input_qty > 0
				begin
					if @bef_qty >= @cancel_qty2		--20200303 캔슬수량과 사전수량이 같을 경우로변경 @bef_qty > @cancel_qty			
						set @leftover_qty = @cancel_qty2
					else
						set @leftover_qty = @input_qty
						
		--set @leftover_qty = @input_qty + @bef_stock_qty - (@bef_qty - @cancel_qty)				
						
					print 'Input_qty = ' + cast(@input_qty as varchar)								
					print 'bef_stock_qty = ' + cast(@bef_stock_qty as varchar)				
					print 'bef_qty = ' + cast(@bef_qty as varchar)				
					print 'cancel_qty = ' + cast(@cancel_qty as varchar)				

					print 'leftover_qty = ' + cast(@leftover_qty as varchar)


					if @leftover_qty > 0
					begin
						set @diff_re_type = '4'
--								set @diff_re_qty =  @leftover_qty 
						set @diff_re_qty = @diff_re_qty*-1
						insert into ksv_po_mrptempre_detail
							(user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,diff_re_type,diff_re_qty,
							matl_seq,matl_price,curr_cd,tot_amt,use_size,bef_po_qty,use_stock_qty)
							values (
							@user_id,@seq,@po_cd,@po_seq,@order_cd,@matl_cd,@mrp_seq2,@diff_re_type,@diff_re_qty,
							@matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size,0,0) 

						-- 캔슬처리되어 있는 애를 leftover로 diff_po_type 코드 바꿈
						update ksv_po_mrptempre_detail set diff_re_type = '1'
						where user_id = @user_id
						and po_cd = @po_cd
						and po_seq = @po_seq
						and order_cd = @order_cd
						and matl_cd = @matl_cd
						and mrp_seq= @mrp_seq2
						and diff_re_type = '9'
					end
					print @mrp_seq
					print @mrp_seq2
				end	
							
				FETCH NEXT FROM kspPoMrpRe_C3
				INTO @po_seq2,@po_qty2,@mrp_seq2
			END

			CLOSE kspPoMrpRe_C3
			DEALLOCATE kspPoMrpRe_C3
		end
	end		
		
print 'slkdf stock_qty ' + cast(@stock_qty as varchar)				
print 'slkdf cancel ' + cast(@cancel_qty as varchar)		
		
-- 재고 적용에서 삭제 cancel stockuse  발주수량취소하고 남는 수량은 재고취소 최근순부터
		if @stock_qty > 0
		begin
		if @cancel_qty > 0
		begin
			set @remain_qty = @cancel_qty
			DECLARE kspPoMrpRe_C2_1 CURSOR FOR		
					select a.matl_cd,a.mrp_seq,sum(a.po_qty),a.stock_idx,b.root_idx,b.factory_cd,a.po_matl_cd
					from ksv_po_mrp a,ksv_stock_matl b
					where a.po_cd = @po_cd 
					and a.po_seq < 97
					and a.order_cd = @order_cd
					and a.po_matl_cd = @matl_cd
					and a.use_po_type = '2'
					and b.stock_idx = a.stock_idx
					group by a.matl_cd,a.mrp_seq,a.stock_idx,b.root_idx,b.factory_cd,a.po_matl_cd
					having sum(a.po_qty)>0
					order by 3
					
			OPEN kspPoMrpRe_C2_1		
		
			FETCH NEXT FROM kspPoMrpRe_C2_1
			INTO @matl_cd2,@mrp_seq2,@po_qty2,@stock_idx,@root_idx,@factory_cd,@po_matl_cd

			WHILE @@FETCH_STATUS = 0
			BEGIN
				if @remain_qty > @po_qty2
					set @stockcancel_qty = @po_qty2
				else 
					set @stockcancel_qty = @remain_qty

				set @diff_re_type = '5'
				set @diff_re_qty = @stockcancel_qty * (-1)					
				
				DECLARE kspPoMrpRe_C2 CURSOR FOR
						select a.po_seq
						from ksv_po_mrp a,ksv_stock_matl b
						where a.po_cd = @po_cd 
						and a.po_seq < 97
						and a.order_cd = @order_cd
						and a.po_matl_cd = @matl_cd
						and a.use_po_type = '2'
						and a.mrp_seq = @mrp_seq2
						and a.po_qty > 0
						and b.stock_idx = a.stock_idx

				OPEN kspPoMrpRe_C2

				FETCH NEXT FROM kspPoMrpRe_C2
				INTO @po_seq2								
	
				WHILE @@FETCH_STATUS = 0
				BEGIN
					FETCH NEXT FROM kspPoMrpRe_C2
					INTO @po_seq2
				END
				CLOSE kspPoMrpRe_C2
				DEALLOCATE kspPoMrpRe_C2

				insert into ksv_po_mrptempre_detail
					(user_id,seq,po_cd,po_seq,order_cd,matl_cd,mrp_seq,diff_re_type,diff_re_qty,
					matl_seq,matl_price,curr_cd,tot_amt,use_size,stock_idx,root_idx,factory_cd,bef_po_qty,use_stock_qty,org_po_seq,po_matl_cd)
					values (
					@user_id,@seq,@po_cd,@po_seq,@order_cd,@matl_cd2,@mrp_seq2,@diff_re_type,@diff_re_qty,
					@matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size,@stock_idx,@root_idx,@factory_cd,0,@po_qty2,@po_seq2,@po_matl_cd) 

				set @remain_qty = @remain_qty - @po_qty2
				set @cancel_qty = @remain_qty
				
				if @remain_qty < = 0
				begin
					set @cancel_qty = (@diff_qty * (-1))-(@bef_qty-@input_qty)-@stock_qty
					print 'remain cancel stock ' + cast(@cancel_qty as varchar)
					break			
				end 				

				FETCH NEXT FROM kspPoMrpRe_C2_1
				INTO @matl_cd2,@mrp_seq2,@po_qty2,@stock_idx,@root_idx,@factory_cd,@po_matl_cd
			END

			CLOSE kspPoMrpRe_C2_1
			DEALLOCATE kspPoMrpRe_C2_1		
		end
		end		
			
		
		

	end

	FETCH NEXT FROM kspPoMrpRe_C1
	INTO @seq,@po_cd,@po_seq,@order_cd,@matl_cd,@mrp_seq,@new_qty,@bef_qty,@diff_qty,@stock_qty,@diff_po_type,
		 @matl_seq,@matl_price,@curr_cd,@tot_amt,@use_size
END

CLOSE kspPoMrpRe_C1
DEALLOCATE kspPoMrpRe_C1


-- 여전히 '9'인 놈 원위치로
update ksv_po_mrptempre_detail set diff_re_type = '2'
where user_id = @user_id
and po_cd = @po_cd
and po_seq = @po_seq
and diff_re_type = '9'

select	@Error = @@ERROR
if @Error != 0 BEGIN return @Error END


RETURN











export class NonPaye {
  id!: number;
  member_id!: number;
  ref_dem_part?:string;
  payment_amount!: number;
  cashflow_id!: number;
  year: string = "";
  company_id!: number;
  motif: string = "";
  status!: number; // 1: non payé, 2: initier, 3: payé
  author: string = "";
  created_at?:Date;
}
// Schema::create('company_attestations', function (Blueprint $table) {
//   $table->id();
//   $table->foreignId('member_id')->index();
//   $table->string('payment_amount')->default(1000);
//   $table->foreignId('cash_register_id');
//   $table->string('year');
//   $table->foreignId('company_id')->index();
//   $table->string('motif')->nullable();
//   $table->tinyInteger('status')->default(1)->comment("1: non payé, 2: initier, 3: payé");
//   $table->string('author')->nullable();
//   $table->boolean('open_close')->default(0);
//   $table->timestamps();
// });

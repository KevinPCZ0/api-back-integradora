import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./config/user.module";
import { ProductModule } from "./config/product.module";
import { GoodsExitModule } from "./config/goodExit.module";
import { GoodsEntryModule } from "./config/goodsEntry.module";
import { BranchModule } from "./config/branch.module";
import { TransferProductModule } from "./config/transferProduct.module";
import { FreightModule } from "./config/freight.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
    GoodsEntryModule,
    GoodsExitModule,
    BranchModule,
    TransferProductModule,
    FreightModule,
  ],
})
export class AppModule {}

import { Injectable } from "@nestjs/common";
import { AssetService } from "../../asset/asset.service";
import { HomeReqDto } from "./dto/home.dto";

@Injectable()
export class HomeService {
  constructor(private assetService: AssetService) {}

  async home(body: HomeReqDto) {}
}

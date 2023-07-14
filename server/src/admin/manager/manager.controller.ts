import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ManagerService } from "./manager.service";
import { Roles } from "../../decorator/roles.decorator";
import { ManagerType } from "../../type/type";
import {
  ManagerListReqDto,
  ManagerListResDto,
  ShowManagerReqDto,
  ShowManagerResDto,
} from "./dto/show-manager.dto";
import { AddManagerReqDto, AddManagerResDto } from "./dto/add-manager.dto";
import { EditManagerReqDto, EditManagerResDto } from "./dto/edit-manager.dto";
import { DeleteManagerReqDto, DeleteManagerResDto } from "./dto/delete-manager.dto";

@ApiTags("manager")
@Controller("admin")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post("/add-manager")
  @ApiCreatedResponse({ type: AddManagerResDto })
  @Roles(ManagerType.SUPER)
  async add(@Body() body: AddManagerReqDto) {
    const pk = await this.managerService.addManager(body);
    return { pk };
  }

  @Post("/manager-list")
  @ApiCreatedResponse({ type: ManagerListResDto })
  @Roles(ManagerType.MANAGER)
  list(@Body() body: ManagerListReqDto) {
    return this.managerService.findAll(body.page);
  }

  // @Roles(ManagerType.MANAGER)
  @Post("/show-manager")
  @ApiCreatedResponse({ type: ShowManagerResDto })
  async show(@Body() body: ShowManagerReqDto) {
    // eslint-disable-next-line camelcase
    const { password_hash, ...result } = await this.managerService.findOneOr404(body.pk);
    return result;
  }

  @Post("/edit-manager")
  @ApiCreatedResponse({ type: EditManagerResDto })
  @Roles(ManagerType.MANAGER)
  edit(@Body() body: EditManagerReqDto) {
    return this.managerService.update(body);
  }

  @Post("/delete-manager")
  @ApiCreatedResponse({ type: DeleteManagerResDto })
  @Roles(ManagerType.MANAGER)
  remove(@Body() body: DeleteManagerReqDto) {
    return this.managerService.remove(body.pk);
  }
}

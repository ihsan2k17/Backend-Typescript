import { Container } from "inversify";
import SalesController from "../Controllers/SalesController";
import ISalesRepository from "../Repositories/Interface/ISalesRepository";
import SalesRepository from "../Repositories/Repository/SalesRepository";
import InterfaceSalesService from "../Services/Interface/InSalesService";
import SalesServ from "../Services/Service/SalesService";
import { IUnitOfWork } from "../Repositories/Interface/iUnitOfWork";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import IAgenRepository from "../Repositories/Interface/IAgenNewRepository";
import AgenRepository from "../Repositories/Repository/AgenRepository";
import IAgenService from "../Services/Interface/IAgenService";
import AgenService from "../Services/Service/AgenService";
import AgenController from "../Controllers/AgenController";
import IHadiahRepository from "../Repositories/Interface/IHadiahRepository";
import HadiahRepository from "../Repositories/Repository/HadiahRepository";
import IHadiahService from "../Services/Interface/IHadiahService";
import HadiahService from "../Services/Service/HadiahService";
import HadiahController from "../Controllers/HadiahController";
import ICustomerRepository from "../Repositories/Interface/ICustomerRepository";
import CustomerRepository from "../Repositories/Repository/CustomerRepository";
import ICustomerService from "../Services/Interface/ICustomerService";
import CustomerService from "../Services/Service/CustomerService";
import CustomerController from "../Controllers/CustomerController";
import ILoginRepository from "../Repositories/Interface/ILoginRespository";
import LoginRepository from "../Repositories/Repository/LoginRepository";
import ILoginService from "../Services/Interface/ILoginService";
import LoginService from "../Services/Service/LoginService";
import LoginController from "../Controllers/LoginController";
import IKuponRepository from "../Repositories/Interface/IKuponRepository";
import KuponRepository from "../Repositories/Repository/KuponRepository";
import IKuponService from "../Services/Interface/IKuponService";
import KuponService from "../Services/Service/KuponService";
import KuponController from "../Controllers/KuponController";
import IPoinRepository from "../Repositories/Interface/IPoinRepository";
import PoinRepository from "../Repositories/Repository/PoinRepository";
import IPeriodeRepository from "../Repositories/Interface/IPeriodeRepository";
import PeriodeRepository from "../Repositories/Repository/PeriodeRepository";
import IPeriodeService from "../Services/Interface/IPeriodeService";
import PeriodeService from "../Services/Service/PeriodeService";
import PeriodeController from "../Controllers/PeriodeController";
import ICustomerNakami from "../Repositories/Interface/ICustomerNakamiRepository";
import CustomerNakamiRepository from "../Repositories/Repository/CustomerNakamiRepository";
import ICustomerNakamiService from "../Services/Interface/ICustomernakamiService";
import CustomerNakamiService from "../Services/Service/CustomerNakamiService";
import CustomerNakamiController from "../Controllers/CustomerNakamiController";
import IHadiahNakamiRepository from "../Repositories/Interface/IHadiahNakamiRepostiory";
import HadiahNakamiRepository from "../Repositories/Repository/HadiahNakamiRepository";
import IHadiahNakamiService from "../Services/Interface/IHadiahNakamiService";
import HadiahNakamiService from "../Services/Service/HadiahNakamiService";
import HadiahNakamiController from "../Controllers/HadiahNakamiController";
import IPoinNakamiRepository from "../Repositories/Interface/IPoinNakamiRepository";
import PoinNakamiRepository from "../Repositories/Repository/PoinNakamiRepository";
import IKuponNakamiRepository from "../Repositories/Interface/IKuponNakamiRepository";
import KuponNakamiRepository from "../Repositories/Repository/KuponNakamiRepository";
import IKuponNakamiService from "../Services/Interface/IkuponNakamiService";
import KuponNakamiService from "../Services/Service/KuponNakamiService";
import KuponNakamiController from "../Controllers/KuponNakamiController";

const container = new Container();

container.bind<IUnitOfWork>("UnitOfWork").to(UnitOfWork);
container.bind<ISalesRepository>("ISalesRepository").to(SalesRepository);
container.bind<IAgenRepository>("IAgenRepository").to(AgenRepository);
container.bind<IHadiahRepository>("IHadiahRepository").to(HadiahRepository);
container.bind<IHadiahNakamiRepository>("IHadiahNakamiRepository").to(HadiahNakamiRepository);
container.bind<ICustomerRepository>("ICustomerRepository").to(CustomerRepository);
container.bind<ICustomerNakami>("ICustomerNakami").to(CustomerNakamiRepository)
container.bind<ILoginRepository>("ILoginRepository").to(LoginRepository);
container.bind<IKuponRepository>("IKuponRepository").to(KuponRepository);
container.bind<IKuponNakamiRepository>("IKuponNakamiRepository").to(KuponNakamiRepository);
container.bind<IPoinRepository>("IPoinRepository").to(PoinRepository);
container.bind<IPoinNakamiRepository>("IPoinNakamiRepository").to(PoinNakamiRepository);
container.bind<IPeriodeRepository>("IPeriodeRepository").to(PeriodeRepository);

container.bind<InterfaceSalesService>("InterfaceSalesService").to(SalesServ);
container.bind<IAgenService>("IAgenService").to(AgenService);
container.bind<IHadiahService>("IHadiahService").to(HadiahService);
container.bind<IHadiahNakamiService>("IHadiahNakamiService").to(HadiahNakamiService)
container.bind<ICustomerService>("ICustomerService").to(CustomerService);
container.bind<ICustomerNakamiService>("ICustomerNakamiService").to(CustomerNakamiService);
container.bind<ILoginService>("ILoginService").to(LoginService);
container.bind<IKuponService>("IKuponService").to(KuponService);
container.bind<IKuponNakamiService>("IKuponNakamiService").to(KuponNakamiService);
container.bind<IPeriodeService>("IPeriodeService").to(PeriodeService)

container.bind<SalesController>(SalesController).toSelf();
container.bind<AgenController>(AgenController).toSelf();
container.bind<HadiahController>(HadiahController).toSelf();
container.bind<CustomerController>(CustomerController).toSelf();
container.bind<LoginController>(LoginController).toSelf();
container.bind<KuponController>(KuponController).toSelf();
container.bind<PeriodeController>(PeriodeController).toSelf();
container.bind<CustomerNakamiController>(CustomerNakamiController).toSelf();
container.bind<HadiahNakamiController>(HadiahNakamiController).toSelf();
container.bind<KuponNakamiController>(KuponNakamiController).toSelf();

export default container;
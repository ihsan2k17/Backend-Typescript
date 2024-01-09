import { SalesVM, SaveSalesVM } from "../../Database/Models/MSalesPerson";

interface InterfaceSalesService{
    searchSales(key:string): Promise<SalesVM[]>
    getAllSales(): any
    getNamaSales(): Promise<SalesVM[]>
    addSales(entity: SaveSalesVM): Promise<boolean|null>
    updateSales(namasales: string, entity: SaveSalesVM): Promise<SaveSalesVM>
    delete(id:string):Promise<SaveSalesVM>
}

export default InterfaceSalesService;
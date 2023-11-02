import { Poin } from "../../Database/Models/MPoin";

interface IPoinRepository {
    cekMaksimum(PoinCust:string, Periode:number): Promise<Poin[]>
}

export default IPoinRepository
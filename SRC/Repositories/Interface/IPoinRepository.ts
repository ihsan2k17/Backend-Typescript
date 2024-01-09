import { Poin } from "../../Database/Models/MPoin";

interface IPoinRepository {
    cekMaksimum(PoinCust:number, Periode:number): Promise<Poin[]>
}

export default IPoinRepository
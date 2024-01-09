import { Poin_Nakami } from "../../Database/Models/MPoin_Nakami"

interface IPoinNakamiRepository {
    cekMaksimum(PoinCust:string, Periode:number): Promise<Poin_Nakami[]>
}

export default IPoinNakamiRepository
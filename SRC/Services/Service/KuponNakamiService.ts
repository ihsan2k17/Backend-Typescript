import { inject, injectable } from "inversify";
import IKuponNakamiService from "../Interface/IkuponNakamiService";
import { Kupon_Nakami, Kupon_NakamiVM, SaveKupon_NakamiVM } from "../../Database/Models/MKupon_Nakami";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import IKuponNakamiRepository from "../../Repositories/Interface/IKuponNakamiRepository";
import IPoinNakamiRepository from "../../Repositories/Interface/IPoinNakamiRepository";

@injectable()
class KuponNakamiService implements IKuponNakamiService {

    private _unitofwork: IUnitOfWork;
    private _kuponRepository: IKuponNakamiRepository;
    private _poinRepository: IPoinNakamiRepository;
    constructor(
        @inject("IUnitOfWork") unitofwork: IUnitOfWork,
        @inject("IKuponNakamiRepository") kuponRepository: IKuponNakamiRepository,
        @inject("IPoinNakamiRepository") poinRepository: IPoinNakamiRepository
    ) {
        this._unitofwork = unitofwork;
        this._kuponRepository = kuponRepository;
        this._poinRepository = poinRepository;
    }

    async Listall(): Promise<Kupon_NakamiVM[]> {
        const cekkupon = await this._kuponRepository.Listall();
        const response = cekkupon.map((kpn: Kupon_Nakami) => {
            const vm = new Kupon_NakamiVM(kpn);
            return vm;
        });

        return response;
    }
    async cekKuponbyIddanPoin(ID: number, Poin:number, Hadiah:number, Tahun:number, User_Input:string, Periode:number): Promise<Kupon_NakamiVM[]> {
        if (!ID) {
            throw new Error(`${ID} tidak ada`);
        }
        const cekkupon = await this._kuponRepository.cekKuponbyIddanPoin(ID, Poin, Hadiah, Tahun, User_Input, Periode);
        const response = cekkupon.map((kpn: Kupon_Nakami) => {
            const vm = new Kupon_NakamiVM(kpn);
            return vm;
        });
        return response;
    }
    async cekIdKupon(ID:number): Promise<Kupon_NakamiVM[]> {
        const cek = await this._kuponRepository.getIdKupon(ID);
        const response = cek.map((kpn:Kupon_Nakami) => {
            const vm = new Kupon_NakamiVM(kpn);
            return vm;
        });
        return response;
    }
    async searchKupon(search: string): Promise<Kupon_NakamiVM[]> {
        const src = await this._kuponRepository.searchKupon(search);
        const response = src.map((kpn: Kupon_Nakami) => {
            const vm = new Kupon_NakamiVM(kpn);
            return vm;
        });
        return response;
    }
    async searchKuponDetail(ID: number, Poin: number, Nama_Hadiah: string, search: string): Promise<Kupon_NakamiVM[]> {
        const src = await this._kuponRepository.searchKuponDetail(ID, Poin, Nama_Hadiah, search);
        const response = src.map((kpn: Kupon_Nakami) => {
            const vm = new Kupon_NakamiVM(kpn);
            return vm;
        });
        return response;
    }
    async createKupon(entity: SaveKupon_NakamiVM): Promise<boolean> {
        try {
            await this._unitofwork.beginTransaction();
            const newdata: Kupon_Nakami = Object.assign(new Kupon_Nakami(), {
                ID: entity.ID,
                Kupon: entity.Kupon,
                Voucher: entity.Voucher,
                Poin: entity.Poin,
                Tahun: entity.Tahun,
                Hadiah_ke: entity.Hadiah_ke,
                Hadiah: entity.Hadiah,
                Nama_Hadiah: entity.Nama_Hadiah,
                Tanggal_Input: entity.Tanggal_Input,
                Tanggal: entity.Tanggal,
                User_Input: entity.User_Input,
                Periode: entity.Periode,
                Jenis: entity.Jenis
            });
            // Pastikan Poin dan Kupon adalah angka
            if (typeof newdata.ID !== 'number'||typeof newdata.Poin !== 'number' || typeof newdata.Kupon !== 'number' || typeof newdata.Periode !=='number') {
                throw new Error('ID, Poin, Periode, dan Kupon harus berupa angka.');
            }

            const poinData = await this._poinRepository.cekMaksimum(newdata.Poin.toString(), newdata.Periode);
            if (poinData.length > 0) {
                const poin = poinData[0];
                if (poin && poin.Maksimum !== undefined) {
                    // Periksa apakah jumlah kupon melebihi batas maksimum
                    if (newdata.Kupon > poin.Maksimum) {
                        throw new Error('Jumlah Kupon telah melebihi batas maksimum dari Poin ('+ entity.Poin +'). Dengan Periode ('+ entity.Periode +')');
                    }
                } else {
                    throw new Error('Data poin dan Periode tidak ditemukan atau Maksimum tidak terdefinisi.');
                }
            } else {
                throw new Error('Data tidak ditemukan. silahkan cek kembali Poin dan Periode anda');
            }

            const validasiKuponPeriode = await this._kuponRepository.validasiKuponandPeriode(newdata.ID, newdata.Kupon, newdata.Periode);
            if(validasiKuponPeriode) {
                throw new Error(`Kupon dengan nomor ${newdata.Kupon} sudah ada pada periode ${newdata.Periode}.`);
            }
            const add = await this._kuponRepository.createKupon(newdata);
            await this._unitofwork.Save();
            const save: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(add);
            return !!save;
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async createVoucher(entity: SaveKupon_NakamiVM): Promise<Boolean> {
        try {
            await this._unitofwork.beginTransaction();
            const newdata: Kupon_Nakami = Object.assign(new Kupon_Nakami(), {
                ID: entity.ID,
                Kupon: entity.Kupon,
                Voucher: entity.Voucher,
                Poin: entity.Poin,
                Tahun: entity.Tahun,
                Hadiah_ke: entity.Hadiah_ke,
                Hadiah: entity.Hadiah,
                Nama_Hadiah: entity.Nama_Hadiah,
                Tanggal_Input: entity.Tanggal_Input,
                Tanggal: entity.Tanggal,
                User_Input: entity.User_Input,
                Periode: entity.Periode,
                Jenis: entity.Jenis
            });
            // Pastikan Poin dan Kupon adalah angka
            if (typeof newdata.ID !== 'number'||typeof newdata.Poin !== 'number' || typeof newdata.Voucher !== 'number'|| typeof newdata.Periode !== 'number') {
                throw new Error('Poin dan Voucher harus berupa angka.');
            }

            const poinData = await this._poinRepository.cekMaksimum(newdata.Poin.toString(), newdata.Periode);
            if (poinData.length > 0) {
                const poin = poinData[0];
                if (poin  && poin.Maksimum !== undefined) {
                    // Periksa apakah jumlah kupon melebihi batas maksimum
                    if (newdata.Voucher > poin.Maksimum) {
                        throw new Error('Jumlah Voucher telah melebihi batas maksimum dari Poin ('+ entity.Poin +'). Dengan Periode ('+ entity.Periode +')');
                    }
                } else {
                    throw new Error('Data poin tidak ditemukan atau Maksimum tidak terdefinisi.');
                }
            } else {
                throw new Error('Data tidak ditemukan. silahkan cek kembali Poin dan Periode anda');
            }

            const validasiVoucherdanPeriode = await this._kuponRepository.validasiVoucherandPeriode(newdata.ID, newdata.Voucher, newdata.Periode);
            if(validasiVoucherdanPeriode){
                throw new Error(`Voucher dengan nomor ${newdata.Voucher} sudah ada pada periode ${newdata.Periode}.`);
            }
            const add = await this._kuponRepository.createKupon(newdata);
            await this._unitofwork.Save();
            const save: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(add);
            return !!save;
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    /* TELAH TERJADI UPDATE PADA UP DURATION JADI TIDAK MENGGUNAKAN K0NDISI POIN DAN HADIAH NAMUN TIDAK DIUBAH DISINI DIKARENA KAN JIKA MENGHAPUS PARAMETER BERTERSEBUT AKAN BERDAMPAK PADA SISI BACKEND */
    async updateDuration(Id: number, Poin: number, User_Input: string, Hadiah: number,Tanggal:string, entity: SaveKupon_NakamiVM): Promise<boolean> {
        const cekid = await this._kuponRepository.selectId(Id);
        if (!cekid) {
            throw new Error(`${Id} tidak tersedia`);
        }
        const cekpoin = await this._kuponRepository.selectPoin(Poin);
        if (!cekpoin) {
            throw new Error(`${Poin} tidak tersedia`);
        }
        const cekuser = await this._kuponRepository.selectUser(User_Input);
        if(!cekuser) {
            throw new Error(`${User_Input} tidak tersedia`)
        }
        const cekhdh = await this._kuponRepository.selectHadiah(Hadiah);
        if(!cekhdh) {
            throw new Error(`${Hadiah} tidak tersedia`)
        }
        try {
            await this._unitofwork.beginTransaction();
            const data: Kupon_Nakami = Object.assign(new Kupon_Nakami(),{
                Input_Duration: entity.Input_Duration,
                ID:Id,
                User_Input:User_Input,
                Tanggal: Tanggal
            });
            await this._kuponRepository.UpdateDuration(data);
            await this._unitofwork.Save();
            const save: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(data);
            if (save) {
                return true
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async UpdateKupon(Id: number, poin: number, kupon: number, entity: SaveKupon_NakamiVM): Promise<boolean> {
        const cekid = await this._kuponRepository.selectId(Id);
        if (!cekid) {
            throw new Error(`${Id} tidak tersedia`);
        }
        const cekpoin = await this._kuponRepository.selectPoin(poin);
        if (!cekpoin) {
            throw new Error(`${poin} tidak tersedia`);
        }
        const cekkupon = await this._kuponRepository.selectKupon(kupon);
        if (!cekkupon) {
            throw new Error(`${kupon} tidak tersedia`);
        }
        try {
            await this._unitofwork.beginTransaction();
            const data: Kupon_Nakami = Object.assign(new Kupon_Nakami(), {
                Kupon: entity.Kupon,
                Hadiah: entity.Hadiah,
                Nama_Hadiah: entity.Nama_Hadiah,
                Hadiah_ke: entity.Hadiah_ke,
                Tahun: entity.Tahun,
                User_Input: entity.User_Input,
                Periode:entity.Periode,
                ID: Id,
                Poin: poin,
                KuponOld: kupon
            });
            await this._kuponRepository.UpdateKupon(data);
            await this._unitofwork.Save();
            const save: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(data);
            if (save) {
                return true
            } else {
                return false;
            }

        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async UpdateVoucher(Id: number, poin: number, voucher: number, entity: SaveKupon_NakamiVM): Promise<boolean> {
        const cekid = await this._kuponRepository.selectId(Id);
        if (!cekid) {
            throw new Error(`${Id} tidak tersedia`);
        }
        const cekpoin = await this._kuponRepository.selectPoin(poin);
        if (!cekpoin) {
            throw new Error(`${poin} tidak tersedia`);
        }
        const cekvcr = await this._kuponRepository.selectVoucher(voucher);
        if (!cekvcr) {
            throw new Error(`${voucher} Tidak tersedia`);
        }
        try {
            await this._unitofwork.beginTransaction();
            const data: Kupon_Nakami = Object.assign(new Kupon_Nakami(), {
                Voucher: entity.Voucher,
                Hadiah: entity.Hadiah,
                Nama_Hadiah: entity.Nama_Hadiah,
                Hadiah_ke: entity.Hadiah_ke,
                Tahun: entity.Tahun,
                User_Input: entity.User_Input,
                Periode:entity.Periode,
                ID: Id,
                Poin: poin,
                VoucherOld: voucher
            });
            await this._kuponRepository.UpdateVoucher(data);
            await this._unitofwork.Save();
            const save: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(data);
            if (save) {
                return true
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async DeleteKupon(Id: number, poin: number, kupon: number): Promise<boolean> {
        const cekid = await this._kuponRepository.selectId(Id);
        if (!cekid) {
            throw new Error(`${Id} tidak tersedia`);
        }
        const cekpoin = await this._kuponRepository.selectPoin(poin);
        if (!cekpoin) {
            throw new Error(`${poin} tidak tersedia`);
        }
        const cekkupon = await this._kuponRepository.selectKupon(kupon);
        if (!cekkupon) {
            throw new Error(`${kupon} tidak tersedia`);
        }
        try {
            await this._unitofwork.beginTransaction()
            const data: Kupon_Nakami = Object.assign(new Kupon_Nakami(), {
                ID: Id,
                Poin:poin,
                Kupon:kupon
            });
            await this._kuponRepository.DeleteKupon(data);
            await this._unitofwork.Save();
            const simpandata: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(data);
            if (simpandata) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async DeleteVoucher(Id: number, poin: number, voucher: number): Promise<boolean> {
        const cekid = await this._kuponRepository.selectId(Id);
        if (!cekid) {
            throw new Error(`${Id} tidak tersedia`);
        }
        const cekpoin = await this._kuponRepository.selectPoin(poin);
        if (!cekpoin) {
            throw new Error(`${poin} tidak tersedia`);
        }
        const cekvcr = await this._kuponRepository.selectVoucher(voucher);
        if (!cekvcr) {
            throw new Error(`${voucher} Tidak tersedia`);
        }
        try {
            await this._unitofwork.beginTransaction()
            const data: Kupon_Nakami = Object.assign(new Kupon_Nakami(), {
                ID: Id,
                Poin:poin,
                Voucher:voucher
            });
            await this._kuponRepository.DeleteVoucher(data);
            await this._unitofwork.Save();
            const simpandata: SaveKupon_NakamiVM = new SaveKupon_NakamiVM(data);
            if (simpandata) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }

}

export default KuponNakamiService;
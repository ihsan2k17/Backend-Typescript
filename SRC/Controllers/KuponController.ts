import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import IKuponService from "../Services/Interface/IKuponService";
import { SaveKuponVM } from "../Database/Models/MKupon";
import { TIME } from "sequelize";

export interface IKuponController {
    Listall(req:Request, res:Response): Promise<Response>;
    cekKupon(req: Request, res: Response): Promise<Response>;
    cekid(req:Request, res:Response): Promise<Response>;
    searchKupon(req:Request, res:Response): Promise<Response>;
    searchKuponVoucher(req:Request, res:Response):Promise<Response>;
    addKupon(req: Request, res: Response): Promise<Response>;
    addVoucher(req: Request, res: Response): Promise<Response>;
    updateDuration(req: Request, res: Response): Promise<Response>;
    updateKupon(req: Request, res: Response): Promise<Response>;
    updateVoucher(req: Request, res: Response): Promise<Response>;
    deleteKupon(req: Request, res: Response): Promise<Response>;
    deleteVoucher(req: Request, res: Response): Promise<Response>;
}

@injectable()
class KuponController implements IKuponController {
    private _skupon: IKuponService;
    constructor(@inject('IKuponService') skupon: IKuponService) {
        this._skupon = skupon;
    }
    async Listall(req: Request, res: Response): Promise<Response> {
        const list = await this._skupon.Listall();
        return res.status(200).json(list);
    }

    async cekKupon(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.ID);
        const poin = parseInt(req.params.Poin);
        const hdh = parseInt(req.params.Hadiah);
        const tahun = parseInt(req.params.Tahun);
        const user = req.params.User_Input
        const periode = parseInt(req.params.Periode);
        try {
            const list = await this._skupon.cekKuponbyIddanPoin(id, poin, hdh, tahun, user, periode)
            if (!list) {
                return res.status(400).json({ message: `${id} tidak ditemukan` });
            } return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json({error})
        }
    }

    async cekid(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.ID);
        
        try {
            const list = await this._skupon.cekIdKupon(id)
            if (!list) {
                return res.status(400).json({ message:` data tidak ditemukan` });
            } return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json({error})
        }
    }

    async searchKupon(req: Request, res: Response): Promise<Response> {
        const parameter = req.params.search;
        const result = await this._skupon.searchKupon(parameter);
        if (!result) {
            return res.status(400).json({ message: `${parameter}` });
        }
        return res.status(200).json(result)
    }

    async searchKuponVoucher(req: Request, res: Response): Promise<Response> {
        const search = req.params.search;
        const id = parseInt(req.params.ID);
        const poin = parseInt(req.params.Poin);
        const namahadiah = req.params.Nama_Hadiah;
        const result = await this._skupon.searchKuponDetail(id, poin, namahadiah, search);
        if(!result) {
            return res.status(400).json({message: `${search} not found`});
        }
        return res.status(200).json(result);
    }

    async addKupon(req: Request, res: Response): Promise<Response> {
        const {
            ID, Kupon, Poin, Tahun, Hadiah_ke,
            Hadiah, Nama_Hadiah, Periode, Jenis } = req.body as SaveKuponVM;
        const User = req.app.locals.credential.Username;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        // Gunakan formattedDate di sini atau lakukan sesuatu yang lain
        try {
            const add = await this._skupon.createKupon({
                ID,
                Kupon,
                Voucher: null,
                Poin,
                Tahun,
                Hadiah_ke,
                Hadiah,
                Nama_Hadiah,
                Tanggal_Input: new Date(),
                Tanggal: formattedDate,
                User_Input: User,
                Periode,
                Jenis,
                Memo: "",
                Input_Duration: new Date()
            });
            if (!add) {
                return res.status(401).json({
                    message:
                        `ada sebuah kesalahan atau mungkin data blm terinput`
                });
            }
            return res.status(201).json({ message: `sukses`, data: add})
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }

    async addVoucher(req: Request, res: Response): Promise<Response> {
        const {
            ID, Voucher, Poin, Tahun, Hadiah_ke,
            Hadiah, Nama_Hadiah, Periode, Jenis } = req.body as SaveKuponVM;
        const User = req.app.locals.credential.Username;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        try {
            const add = await this._skupon.createVoucher({
                ID,
                Kupon: null,
                Voucher,
                Poin,
                Tahun,
                Hadiah_ke,
                Hadiah,
                Nama_Hadiah,
                Tanggal_Input: new Date(),
                Tanggal: formattedDate,
                User_Input: User,
                Periode,
                Jenis,
                Memo: "",
                Input_Duration: new Date()
            });
            if (!add) {
                return res.status(401).json({
                    message:
                        `ada sebuah kesalahan atau mungkin data belum terinput`
                });
            }
            return res.status(201).json({ message: `sukses`, data: add })
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }

    async updateKupon(req: Request, res: Response): Promise<Response> {
        const { ID, Poin, KuponOld } = req.params;
        const { Kupon, Hadiah, Nama_Hadiah, Hadiah_ke, Tahun, Periode } = req.body as SaveKuponVM ;
        const User = req.app.locals.credential.Username;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        try {
            const update = await this._skupon.UpdateKupon(Number(ID),
                Number(Poin),
                Number(KuponOld), {
                    Kupon,
                    Hadiah,
                    Nama_Hadiah,
                    Hadiah_ke,
                    Tahun,
                    User_Input: User,
                    Periode,
                    Tanggal: formattedDate,
                    Tanggal_Input: new Date(),
                    Memo: "",
                    Jenis: "",
                    Input_Duration: new Date
                });
            if (!update) {
                return res.status(402).json({
                    message:
                        `ada sebuah kesalahan atau mungkin data belum di update`
                });
            }
            return res.status(202).json({ message: `${Kupon} berhasil di ubah` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    async updateDuration(req: Request, res: Response): Promise<Response> {
        const {ID, Poin, Hadiah} = req.params;
        const Input_Duration = req.body
        const User = req.app.locals.credential.Username;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        try {
            const upduration = await this._skupon.UpdateInputDuration(
                Number(ID),
                Number(Poin),
                User,
                Number(Hadiah),
                formattedDate,
                Input_Duration
                );
            if(!upduration) {
                return res.status(402).json({
                    message:
                        `ada sebuah kesalahan atau mungkin data belum di update`
                });
            }
            return res.status(202).json({ message: `${Input_Duration} berhasil di ubah` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }

    async updateVoucher(req: Request, res: Response): Promise<Response> {
        const { ID, Poin, VoucherOld } = req.params;
        const { Voucher, Hadiah, Nama_Hadiah, Hadiah_ke, Tahun, Periode } = req.body as SaveKuponVM;
        const User = req.app.locals.credential.Username;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        try {
            const update = await this._skupon.UpdateVoucher(Number(ID),
                Number(Poin),
                Number(VoucherOld), {
                    Voucher,
                    Hadiah,
                    Nama_Hadiah,
                    Hadiah_ke,
                    Tahun,
                    User_Input: User,
                    Periode,
                    Tanggal: formattedDate,
                    Tanggal_Input: new Date(),
                    Memo: "",
                    Jenis: "",
                    Input_Duration: new Date
                });
            if (!update) {
                return res.status(402).json({
                    message:
                        `ada sebuah kesalahan atau mungkin data belum di update`
                });
            }
            return res.status(202).json({ message: `${Voucher} berhasil di ubah` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }

    async deleteKupon(req: Request, res: Response): Promise<Response> {
        const {ID, Poin, Kupon} = req.params;
        try {
            const hapus = await this._skupon.DeleteKupon(
                Number(ID),
                Number(Poin), 
                Number(Kupon));
            if (!hapus) {
                return res.status(402).json({message:`ada sebuah kesalah coba cek ID, Poin, dan Kupon nya`});
            };
            return res.status(202).json({message:`${Kupon} Berhasil Di Hapus`})
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }

    async deleteVoucher(req: Request, res: Response): Promise<Response> {
        const {ID, Poin, Voucher} = req.params;
        try {
            const hapus = await this._skupon.DeleteVoucher(
                Number(ID),
                Number(Poin), 
                Number(Voucher));
            if (!hapus) {
                return res.status(402).json({message:`ada sebuah kesalah coba cek ID, Poin, dan Kupon nya`});
            };
            return res.status(202).json({message:`${Voucher} Berhasil Di Hapus`})
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
}

export default KuponController;
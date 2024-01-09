# ENDPOINT ATAU URL UNTUK AKSES BACKEND KUPON

Baseurl: "http://192.168.77.222:8080/Kupon"

sales:
"/api/sales/getAll" : untuk menampilkan Seluruh data Sales
"/api/sales/getname" : untuk menampilkan seluruh data sales namun hanya
                                  namasales saja
"/api/sales/search/:key" : untuk mencari data sales dan menampilkan nya
"/api/sales/create" : untuk membuat data baru di sales
"/api/sales/update/:namasales" : untuk mengubah data yang telah di sales dengan menggunakan
                               parameter namasales
"/api/sales/delete/:id" : untuk menghapus data pada sales dengan menggunakan parameter
                        id sales nya

hadiah: 
"/api/hadiah/getall" : untuk menampilkan seluruh data hadiah
"/api/hadiah/getbaranghadiah" : hanya menampilkan kolom barang
"/api/hadiah/gethadiahfindpoin/:Poin_Hadiah" : untuk menampilkan data 
                                               berdasarkan Poin_Hadiah

agen:
"/api/agen/getall" : untuk menampilkan seluruh data agen
"/api/agen/getallnama/:Agen_Name" : untuk menampilkan data 
                                    agen berdasarkan nama agen
"/api/agen/getnama" : hanya menampilkan data nama agen 
"/api/agen/getnamefindname/:Agen_Name" : hanya menampilkan data nama agen berdasarkan
                                         nama agen 
"/api/agen/createagen" : untuk membuat data agen baru
"/api/agen/update/:AgenID/:Agen_Name" : untuk mengubah data agen berdasarkan AgenID
                                        dan Agen_Name
"/api/agen/delete/:AgenID/:Agen_Name/:Kota/:SalesID : untuk menghapus data berdasarkan
                                                      AgenID, Agen_Name, Kota, SalesID
                                                      note: harus dimasukin semua
                                                      parameter nya



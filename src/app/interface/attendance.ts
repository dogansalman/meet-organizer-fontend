export interface Attendance {
    /*
    attendance_id?:number 
    Yeni bir katılımcı eklenmek istendiğinde "Kaydet" işleminden önce id değerini almamış olacağı için 
    ilgili alanının zorunluluğunu kaldırıyoruz. 
    */
    attendance_id?: number;
    fullname: string;
}
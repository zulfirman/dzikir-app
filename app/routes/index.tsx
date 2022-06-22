import {Link, useLoaderData} from "@remix-run/react";
import moment from 'moment';
import {useState} from "react";

async function getDataNew() {
    const momentNow = moment();
    const jadwalSholat = await fetch(process.env.URL_API_MYQURAN + `/sholat/jadwal/1301/${momentNow.format('YYYY/MM/DD')}`);
    const alIkhlas = await fetch(process.env.URL_API_BANGHASAN + "/quran/format/json/surat/112/ayat/1-1000");
    const alFalaq = await fetch(process.env.URL_API_BANGHASAN + "/quran/format/json/surat/113/ayat/1-1000");
    const anNashr = await fetch(process.env.URL_API_BANGHASAN + "/quran/format/json/surat/110/ayat/1-1000");
    return {
        'jadwal-sholat': await jadwalSholat.json(),
        'alIkhlas': await alIkhlas.json(),
        'alFalaq': await alFalaq.json(),
        'anNashr': await anNashr.json(),
    }
}

export async function loader() {
    return getDataNew()
}

export default function Index() {
    const result = useLoaderData();
    const jadwalHead = result['jadwal-sholat']['data']['jadwal'];
    delete jadwalHead["tanggal"];
    delete jadwalHead["date"];
    const alIkhlas = result['alIkhlas']['ayat']['data']['idt'];
    const alFalaq = result['alFalaq']['ayat']['data']['idt'];
    const anNashr = result['anNashr']['ayat']['data']['idt'];
    let count = {
        1: 0,
        2: 0,
        3: 0,
    };
    const [counter, setCounter] = useState(count);
    const increment = (id: number) => {
        // @ts-ignore
        setCounter({ ...counter, [id]: counter[id] + 1 })
    };
    function countAdd(id: number) {
        // @ts-ignore
        if(counter[id]>32){
            setCounter({ ...counter, [id]: 1 })
            return true;
        }
        // @ts-ignore
        setCounter({ ...counter, [id]: counter[id] + 1 })
    }
    let i = 1;
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Astagfirullah 3X</p>
                                </div>
                                <div className="col-md-4">
                                    <p>Allaahumma antas salaamu waminkas salaamu wailaika ya'uudus salaamu fahayyiina rabbanaa bissalaami wa'adkhilnal jannata daarassalaami tabaarakta rabbanaa wata'aalaita yaadzal jalaali wal ikraam.</p>
                                    <p>أَسْتَغْفِرُ اللهَ (ثَلاَثاً) اللَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَـا ذَا الْجَلاَلِ وَاْلإِكْرَامِ</p>
                                </div>
                                <div className="col-md-4">
                                    <p>Laailaaha illallah wahdahu la syariika lahu, lahulmulku walahul hamdu wa huwa ‘alaa kulli syai’in Qodir’

                                        Allahuma la mani’a lima a’thoita,  wala mu’tia lima mana’ta, wala yanfa’u dzal jaddi minkal jadd</p>
                                    <p>لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ، اللَّهُمَّ لاَ مَانِعَ لِمَا أَعْطَيْتَ، وَلاَ مُعْطِيَ لِمَا مَنَعْتَ، لاَ يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ</p>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className={"row text-center"}>
                                        <div className="col-md-4">
                                            <h3>Subhanallah</h3>
                                            <button onClick={() => { countAdd(1) }} type="button" className="btn btn-primary">&nbsp;{counter[1]}&nbsp;</button>
                                        </div>
                                        <div className="col-md-4">
                                            <h3>Alhamdulillah</h3>
                                            <button onClick={() => { countAdd(2) }} type="button" className="btn btn-primary">&nbsp;{counter[2]}&nbsp;</button>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <h3>Allahu Akbar</h3>
                                            <button onClick={() => { countAdd(3) }} type="button" className="btn btn-primary">&nbsp;{counter[3]}&nbsp;</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3>Al Ikhlas</h3>
                                    <em dangerouslySetInnerHTML={{
                                        __html: alIkhlas.map((val: { [x: string]: any; }, i: any) => {
                                            return (val['teks'])
                                        })
                                    }}></em>
                                    <p></p>
                                </div>
                                <div className="col-md-6">
                                    <h3>Al Falaq</h3>
                                    <em dangerouslySetInnerHTML={{
                                        __html: alFalaq.map((val: { [x: string]: any; }, i: any) => {
                                            return (val['teks'])
                                        })
                                    }}></em>
                                    <p></p>
                                </div>
                                <div className="col-md-6">
                                    <h3>An Nashr</h3>
                                    <em dangerouslySetInnerHTML={{
                                        __html: anNashr.map((val: { [x: string]: any; }, i: any) => {
                                            return (val['teks'])
                                        })
                                    }}></em>
                                    <p></p>
                                </div>
                                <div className="col-md-6">
                                    <h3>Ayat Kursi</h3>
                                    <p><em>اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ
                                        وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي
                                        يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا
                                        خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ
                                        كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ
                                        الْعَلِيُّ الْعَظِيمُ</em></p>
                                </div>
                                <div className="col-md-12">
                                    <h3>Bacaan Latin (Tulisan Ayat Kursi Latin)</h3>
                                    <p><em>“Allahu la ilaha illa huw, al-hayyul-qayyum, la ta khuzuhu sinatuw wa la na
                                        um, lahu ma fis-samawati wa ma fil-ard, man zallazi yasyfa’u ‘indahu illa bi
                                        ‘iznih, ya’lamu ma baina aidihim wa ma khalfahum, wa la yuhituna bisyai’ im min
                                        ilmihi illa bima sya, wasi’a kursiyyuhus-samawati wal-ard, wa la ya’uduhu
                                        hifzuhuma, wa huwal-aliyyul-azim.”</em></p>
                                </div>
                                <div className="col-md-12">
                                    <h2>Jadwal Sholat</h2>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Sholat</th>
                                            <th scope="col">Jam</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Object.keys(jadwalHead).map((key) => (
                                            <tr key={key}>
                                                <th>{i++}</th>
                                                <td>{key}</td>
                                                <td>{jadwalHead[key]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// import { getServerSideProps } from "../pages/login";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
import TimePicker from 'react-time-picker/dist/entry.nostyle'

import "react-multi-date-picker/styles/colors/green.css"
import Icon from "react-multi-date-picker/components/icon"
import { useRouter } from "next/router";
import { api } from "../services/api";
import DateCard from "./DateCard";
import AvaiabilityPanel from "./AvaiabilityPanel";

const Profile = (props) => {
    const { user } = useAuth();
    const { router } = useRouter();
    const [value, setValue] = useState(new Date());
    const [selected, setSelected] = useState(user.availability.map(ts => { return new Date(ts) }) ?? []);
    const [radio, setRadio] = useState({});

    const datePickerRef = useRef();
    const timePickerRef = useRef();
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    // useEffect((radio) => {
    //     // let oldState = { ...radio }
    //     setRadio({})
    //     selected.map(ts => {
    //         let d = new Date(ts)
    //         setRadio(state => {
    //             let newState = { ...state }
    //             newState[d.getDate()] = newState[d.getDate()] ?? 'Ambos'
    //             return newState
    //         })
    //     })
    // }, [selected])

    //TODO - Quando implementar a integração com banco de dados, verificar se o array de datas é igual ao array recebido
    useEffect(() => {
        if (selected.length === 0) {
            props.save(true)
        } else {

        }
    }, [selected, props])

    const handleChange = (dates) => {
        setSelected(dates)
        props.save(false)
        // setSelected(event.target.value)
    }

    const handleSaveDates = async (dates) => {
        let data = {
            dates,
            radio
        }
        await api.post('/user/availability', data)
        props.save(true)
        datePickerRef.current.closeCalendar()
    }

    const updateRadio = useCallback((radio, day, value) => {
        let newRadio = { ...radio }
        newRadio[day] = value
        setRadio(newRadio)
    }, [])



    return (
        <div className="flex flex-row h-screen text-center">
            <div className="bg-white w-full lg:w-11/12 lg:mx-auto lg:my-12 py-8 md:py-12 lg:rounded-xl">
                <div className="flex flex-row h-fit justify-center">
                    <Image src={user.avatar_url} alt="Avatar do Usuário" width={200} height={200} className="rounded-full" />
                </div>
                <p className="pt-4 text-2xl font-medium">{user.first_name} {user.last_name}</p>
                <p className="text-red-500 text-2xl font-bold">Ainda em Implementação</p>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                    <div>
                        <div>Cargos: {user.role}</div>
                        <div className="flex flex-row flex-wrap justify-around md:justify-between px-4 md:px-8 items-center">

                            <DatePicker
                                ref={datePickerRef}
                                className="green"
                                multiple
                                sort
                                value={selected}
                                onChange={handleChange}
                                disableMonthPicker
                                disableYearPicker
                                calendarPosition="top-center"
                                minDate={new Date().setDate(1)}
                                maxDate={new Date(2022, value.getMonth() + 1, 0)}
                                placeholder={'Selecione as datas'}
                                showTimePicker
                                format="DD/MM"
                                weekDays={weekDays}
                                months={months}
                                render={<Icon />}
                                withPortal
                                portalId="date-picker-portal"

                                plugins={[
                                    <DatePanel header="Datas" key={'datepanel'} />,
                                ]}
                            >
                                <AvaiabilityPanel dates={selected} radio={radio} setRadio={setRadio} updateRadio={updateRadio} />
                                <button
                                    style={{ margin: "0 0 20px", color: "white", backgroundColor: "#3d9970 ", borderRadius: "10px", padding: "5px 10px", "& button:hover": { backgroundColor: "#2c7a59" } }}
                                    onClick={() => handleSaveDates(selected)}
                                >
                                    Salvar
                                </button>
                            </DatePicker>
                            {/* <div className="flex flex-col">
                                {`Disponibilidade: ${''
                                    }`}
                                <div className="grid grid-cols-6">
                                    {selected.map((date) => {
                                        return <DateCard key={date} date={date} onChange={updateRadio} />
                                    })//.join(', ')
                                    }
                                </div>
                            </div> */}


                        </div>
                    </div>
                    <div>
                        Repertórios: {user.playlists}
                        {console.log(radio)}
                        {Object.keys(radio).map(key => {
                            return <div key={key}>{key} - {radio[key]}</div>
                        })}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Profile;
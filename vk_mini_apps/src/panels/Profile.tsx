import { FC, useEffect, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useCitiesList, useCountryList } from "../hooks/useWorldInfo.ts";
import PhoneInput from "@/components/ui/inputs/TelInput.tsx";
import SelectInput from "@/components/ui/inputs/SelectInput.tsx";

import styles from "./Profile.module.css";
import InputField from "@/components/ui/inputs/InputField.tsx";
import { ListItem } from "@/components/ui/ListItem.tsx";
import { get } from "node_modules/axios/index.d.cts";

export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
}

const EditableText: FC<{ 
    name: string; 
    onSave: (newName: string) => void; 
}> = ({ name, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const [showInput, setShowInput] = useState(false); // Для анимации

    const handleSave = () => {
        setIsEditing(false);
        onSave(currentName);
    };

    useEffect(() => {
        if (isEditing) {
            setShowInput(true);
        } else {
            const timeout = setTimeout(() => setShowInput(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isEditing]);

    return (
        <div className={styles.editableText}>
            {isEditing ? (
                <input
                    name="name"
                    type="text"
                    value={currentName}
                    autoFocus
                    className={`${styles.textInput} ${showInput ? styles.inputVisible : styles.inputHidden}`}
                    onChange={(e) => setCurrentName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                        if (e.key === "Escape") setIsEditing(false);
                    }}
                />
            ) : (
                <h3
                    className={`${styles.textDisplay} ${isEditing ? styles.hiddenText : ""}`}
                    onClick={() => setIsEditing(true)}
                >
                    {currentName}
                </h3>
            )}
        </div>
    );
};

export const Profile: FC<ProfileProps> = ({ id }) => {
    const { data: countryList } = useCountryList();
    const navigate = useNavigate();

    const userData = localStorage.getItem("user_data");
    const parsedUserData = userData ? JSON.parse(userData) : null;

    type FormData = {
        name: string;
        country_name: string;
        country_code: string;
        city: string;
        date_of_birth: string;
    }
    const [formData, setFormData] = useState<FormData>({
        name: parsedUserData?.name || "Не указано",
        country_name: parsedUserData?.country_name || "Не указано",
        country_code: parsedUserData?.country || "Не указано",
        city: parsedUserData?.city || "Не указано",
        date_of_birth: parsedUserData?.date_of_birth || "Не указано",
    })
    const { data: citiesList } = useCitiesList(formData.country_code);


    function getAgeFromBirthDate(birthDateString: string): number {
        const birthDate = new Date(birthDateString);
        if (isNaN(birthDate.getTime())) {
            throw new Error("Неверный формат даты.");
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }

    const handleSaveProfile = () => {
        const user_id = localStorage.getItem('user_id')
    };

    const handleInputChangeCountry = (e: { value: string; label: string; }) => {
        setFormData({ ...formData, country_name: e.label, country_code: e.value});
    }
    const handlerInputChangeCity = (e: { value: string; label: string; }) => {
        setFormData({ ...formData, city: e.value});
    }
    const handleInputChangeDate= (e: { target: { value: string; }; }) => {
        setFormData({ ...formData, date_of_birth: e.target.value});
        
    }
    return (
        <>
            <Panel id={id}>
                <div className="px-6">
                    <Header text="Профиль" />
                    <div>
                        <Spacing />
                        <div>
                            <div className="flex relative my-7">
                                <Avatar className="mr-6" typeRank={7} />
                                <div className="h-full flex flex-col gap-2 w-full">
                                    <EditableText name={formData.name} onSave={() => {} } />
                                    <p className="text-[#8484f0] leading-[1.125rem]">
                                        {"Сержант Кискисенко"}
                                    </p>
                                </div>
                            </div>
                            <form>
                                <SelectInput
                                    label="Страна"
                                    defaultValue={{ label: formData.country_name, value: "RU" }}
                                    value={formData.country_name}
                                    options={countryList?.map((country) => ({
                                        value: country.country_code,
                                        label: country.country_name,
                                    }))}
                                    onChange={handleInputChangeCountry}
                                />

                                 <SelectInput
                                    label="Город"
                                    value={formData.city}
                                    options={citiesList?.map((city) => ({

                                        value: city.city,
                                        label: city.city,
                                    }))}
                                    onChange={handlerInputChangeCity}
                                />
                                <InputField 
                                label={"Дата рождения"} 
                                type={"date"} 
                                name={""}
                                value={formData.date_of_birth} 
                                onChange={ handleInputChangeDate}                                
                                />
                            <ListItem iconName={""} route={""} text={"Сейчас вам "} value={getAgeFromBirthDate(formData.date_of_birth)  } />

                            </form>
                        </div>

                        <div>
                            <LargeButton
                                text="Сохранить"
                                onClick={handleSaveProfile}
                            />
                        </div>
                    </div>
                </div>

                <Footer />
            </Panel>
        </>
    );
};

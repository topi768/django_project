import React, { FC, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { EditableText } from "@/components/ui/inputs/EditableText"; // Импорт нового компонента
import { useUpdateUserProfile } from "../hooks/useUser.ts";
import { useCitiesList, useCountryList } from "../hooks/useWorldInfo.ts";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import SelectInput from "@/components/ui/inputs/SelectInput.tsx";
import InputField from "@/components/ui/inputs/InputField.tsx";
import { Avatar } from "../components/Avatar";
import { ListItem } from "@/components/ui/ListItem.tsx";

export interface ProfileProps extends NavIdProps {}

export const Profile: FC<ProfileProps> = ({ id }) => {
    const mutationUpdateProfile = useUpdateUserProfile();

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
    };
    const [formData, setFormData] = useState<FormData>({
        name: parsedUserData?.name || "Не указано",
        country_name: parsedUserData?.country_name || "Не указано",
        country_code: parsedUserData?.country || "Не указано",
        city: parsedUserData?.city || "Не указано",
        date_of_birth: parsedUserData?.date_of_birth || "Не указано",
    });

    const { data: citiesList } = useCitiesList(formData.country_code);
    const getAgeFromBirthDate = (birthDateString: string): number => {
        const birthDate = new Date(birthDateString);

        if (isNaN(birthDate.getTime())) {
            return 0; // Возраст не определён
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
    };

    const handleSaveProfile = () => {
        mutationUpdateProfile.mutate({
            name: formData.name,
            country: formData.country_code,
            city: formData.city,
            date_of_birth: formData.date_of_birth,
        });
        localStorage.setItem("user_data", JSON.stringify(formData));
    };

    const handleInputChangeCountry = (e: { value: string; label: string }) => {
        setFormData({ ...formData, country_name: e.label, country_code: e.value, city: "Не указано" });
    };

    const handlerInputChangeCity = (e: { value: string; label: string }) => {
        setFormData({ ...formData, city: e.value });
    };

    const handleInputChangeDate = (e: { target: { value: string } }) => {
        setFormData({ ...formData, date_of_birth: e.target.value });
    };

    return (
        <Panel id={id}>
            <div className="px-6">
                <Header text="Профиль" />
                <div>
                    <div className="flex relative my-7">
                        <Avatar className="mr-6"  />
                        <div className="h-full flex flex-col gap-2 w-full">
                            <EditableText
                                name={formData.name}
                                onSave={(newName) => setFormData({ ...formData, name: newName })}
                            />
                            <p className="text-[#8484f0] leading-[1.125rem]">{"Сержант Кискисенко"}</p>
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
                            onChange={handleInputChangeDate}
                        />
                        <ListItem
                            iconName={""}
                            route={""}
                            text={"Сейчас вам "}
                            value={getAgeFromBirthDate(formData.date_of_birth)}
                        />
                    </form>
                </div>

                <div>
                    <LargeButton text="Сохранить" onClick={handleSaveProfile} />
                </div>

                {/* Отображение статуса */}
                <div className="mt-4">
                    {mutationUpdateProfile.status === "pending" && (
                        <p className="text-blue-500">Обновление данных...</p>
                    )}
                    {mutationUpdateProfile.status === "error" && (
                        <p className="text-red-500">Ошибка при обновлении данных. Попробуйте снова.</p>
                    )}
                    {mutationUpdateProfile.status === "success" && (
                        <p className="text-green-500">Данные успешно обновлены!</p>
                    )}
                </div>
            </div>

            <Footer />
        </Panel>
    );
};

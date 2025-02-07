import React, { FC, useEffect, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { EditableText } from "@/components/ui/inputs/EditableText"; 
import { useDeleteAccount, useGetMyUserId, useGetUserData, useUpdateUserProfile, useUserStats } from "../hooks/useUser.ts";
import { useCitiesList, useCountryList } from "../hooks/useWorldInfo.ts";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import SelectInput from "@/components/ui/inputs/SelectInput.tsx";
import InputField from "@/components/ui/inputs/InputField.tsx";
import { Avatar } from "../components/Avatar";
import { ListItem } from "@/components/ui/ListItem.tsx";
import { useGetMyPlaceInLeaderboard } from "@/hooks/useLeaderboard.ts";

export interface ProfileProps extends NavIdProps {}

export const Profile: FC<ProfileProps> = ({ id }) => {
    const mutationUpdateProfile = useUpdateUserProfile();
    const {data: userId} = useGetMyUserId()
    const { data: userData, isLoading, isError, error,refetch: refetchUserData } = useGetUserData(userId);
    
    const { data: countryList } = useCountryList();
    const navigate = useNavigate();
    const {mutate: deleteAccount} = useDeleteAccount();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        country_name: "",
        country_code:  "Не указано",
        city:"Не указано",
        date_of_birth: "Не указано",
    });
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                country_name: countryList?.find((country) => country.country_code === userData.country)?.country_name || "",
                country_code: userData.country,
                city: userData.city,
                date_of_birth: userData.date_of_birth,
            });
        }
    }, [userData, countryList]);

    type FormData = {
        name: string;
        country_name: string;
        country_code: string;
        city: string;
        date_of_birth: string;
    };



    const { data: citiesList } = useCitiesList(formData.country_code);
    const getAgeFromBirthDate = (birthDateString: string): number => {
        const birthDate = new Date(birthDateString);
        if (isNaN(birthDate.getTime())) return 0; // Возраст не определён
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
        if (!hasHadBirthdayThisYear) age--;
        return age;
    };

    const handleSaveProfile = () => {
        if (!formData.name) {
            setErrorMessage("Имя не может быть пустым");
            return;
        }
        setErrorMessage("");
        mutationUpdateProfile.mutate({
            name: formData.name,
            country: formData.country_code,
            city: formData.city,
            date_of_birth: formData.date_of_birth,
        });
        refetchUserData();
        localStorage.setItem("user_data", JSON.stringify(formData));
    };

    const handleInputChangeCountry = (e: { value: string; label: string }) => {
        setFormData({ ...formData, country_name: e.label, country_code: e.value, city: "" });
        
    };

    const handlerInputChangeCity = (e: { value: string; label: string }) => {
        setFormData({ ...formData, city: e.value });
    };

    const handleInputChangeDate = (e: { target: { value: string } }) => {
        setFormData({ ...formData, date_of_birth: e.target.value });
    };

    const handleDeleteAccount = () => {
        deleteAccount();
        setShowConfirmation(false);
        navigate("/login");
    };
      const {data: userStats} = useUserStats()
      const [rankNumber, setRankNumber] = useState(0)
      useEffect (() => {
        if (userStats) {
          console.log(userStats.rank)
          
          setRankNumber(userStats.rank)
          
        }
      }, [userStats])

    return (
        <Panel id={id}>
            <div className="px-6">
                <Header text="Профиль" />
                <div>
                    <div className="flex relative my-7">
                        <Avatar typeRank={rankNumber} className="mr-6"  />
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
                            defaultValue={
                                {
                                    value: formData.country_code,
                                    label: formData.country_name
                                }
                            }
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
                            defaultValue={
                                {
                                value: formData.city,
                                label: formData.city
                            }}
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
                <div className="my-4 text-center">
                    {mutationUpdateProfile.status === "pending" && (
                        <p className="text-blue-500">Обновление данных...</p>
                    )}
                    {mutationUpdateProfile.status === "error" && (
                        <p className="text-red-500">Ошибка при обновлении данных. Попробуйте снова.</p>
                    )}
                    {mutationUpdateProfile.status === "success" && (
                        <p className="text-green-500">Данные успешно обновлены!</p>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>

                {/* Кнопка удаления с подтверждением */}
                <LargeButton
                    onClick={() => setShowConfirmation(true)}
                    text="Удалить аккаунт"
                    isPrimary={false}
                    className="bg-red-500 text-white transition-all duration-300 ease-in-out hover:bg-red-600 active:bg-red-700 shadow-md"
                />

                {/* Модальное окно подтверждения */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
                            <h2 className="text-base font-semibold text-center mb-1">{'Нам жалко терять такого котика как Вы :('}</h2>
                            <h2  className="text-base font-semibold text-center mb-4"> Уверены, что хотите удалить аккаунт?</h2>
                            <div className="flex justify-around">
                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                                >
                                    Да, удалить
                                </button>
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-all"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </Panel>
    );
};

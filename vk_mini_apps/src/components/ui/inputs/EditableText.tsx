import React, { FC, useEffect, useState } from "react";
import styles from "./EditableText.module.css";

interface EditableTextProps {
    name: string;
    onSave: (newName: string) => void;
}

export const EditableText: FC<EditableTextProps> = ({ name, onSave }) => {
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
            if (currentName === "") {
                setCurrentName('Не указано');
            }
            return () => clearTimeout(timeout);
        }
    }, [isEditing]);
    useEffect(() => {
        setCurrentName(name);
        
    }, [name]);

    const handleInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCurrentName(e.target.value);
    };

    return (
        <div className={styles.editableText}>
            {isEditing ? (
                <input
                    name="name"
                    type="text"
                    value={currentName}
                    autoFocus
                    className={`${styles.textInput} ${showInput ? styles.inputVisible : styles.inputHidden}`}
                    onChange={handleInputChangeName}
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

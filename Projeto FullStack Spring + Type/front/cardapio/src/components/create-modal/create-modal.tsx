import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/FoodData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </div>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title, 
            price,
            image
        }
        mutate(foodData);
    }

    useEffect(() => {
        if (isSuccess) {
            closeModal();
            setTitle("");
            setPrice(0);
            setImage("");
        }
    }, [isSuccess, closeModal])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>&times;</button>
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Título" value={title} updateValue={setTitle} />
                    <Input label="Preço" value={price} updateValue={setPrice} />
                    <Input label="Imagem" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary" disabled={isLoading}>
                    {isLoading ? 'Postando...' : 'Postar'}
                </button>
            </div>
        </div>
    )
}

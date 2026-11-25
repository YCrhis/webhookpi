
interface onChangeHandlerI {
    state: any;
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLSelectElement>;
    setState: React.Dispatch<React.SetStateAction<any>>
}

export const onChangeHandler = ({e, state, setState}: onChangeHandlerI) =>{
    const {name, value} = e.target;
    setState({...state, [name]: value})
}
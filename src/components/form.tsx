export function Input(props: {id: string, label: string, required?: boolean}) {
    return (
        <div>
            <label for={props.id}>{props.label}:</label>
            <br />
            <input id={props.id} class="border-2 rounded-md" required={props.required}/>
        </div>
    )
}

export function SubmitButton() {
    return (
        <button class="bg-[#ff8c37] py-1 w-20 rounded-md" type="submit">
            Submit
        </button>
    )
}
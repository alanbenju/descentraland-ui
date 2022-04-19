import React, { useEffect, useState } from 'react'
import {
    Button,
    Close,
    Field,
    Form,
    Header,
    Modal,
} from 'decentraland-ui'
import { Props } from './Transfer.types'
import './Transfer.css'

import { useNavigate } from "react-router-dom";

const Transfer: React.FC<Props> = ({
    onTransfer,
    isTransfering,
    error,
    isConnected
}) => {

    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(true);

    const onSend = () => {
        console.log("ON SEND", address, amount)
        if (address && amount) onTransfer(address, amount)
    }
    
    let navigate = useNavigate();

    let back = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setOpen(false)
        navigate(-1);
    };

    if (!isConnected) navigate("/");

    useEffect(() => {
        if (!isConnected) navigate("/") 
    })


    return (
        <>

            <Modal
                size={'small'}
                open={open}
                onClose={back}
                closeIcon={<Close />}
            >
                <Modal.Header>
                    <Header size="medium">Transfer</Header>
                    <p className='subtitle'>Send tokens to an account</p>
                </Modal.Header>

                <Modal.Content>
                    <Form>
                        <Field width={3} label="AMOUNT" placeholder="100" type="number" onChange={e => setAmount(Number(e.target.value))} />
                        <Field label="ADDRESS" type="address" onChange={e => setAddress(e.target.value)} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => onSend()} loading={isTransfering}>
                        Send
                    </Button>
                    {error ? <p className="error">{error}</p> : null}

                </Modal.Actions>
            </Modal>

        </>
    )
}

export default Transfer

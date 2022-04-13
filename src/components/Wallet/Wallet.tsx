import React from 'react'
import {
    Button,
    Card,
    Center,
    Footer,
    Header,
    Page,
} from 'decentraland-ui'
import { Props } from './Wallet.types'
import './Wallet.css'
import { Link, useLocation } from 'react-router-dom'

const Wallet: React.FC<Props> = ({
    address,
    balance,
    isConnected,
    onConnect,
    isConnecting,
    error,
}) => {

    let location = useLocation();

    console.log("wallet location", location)
    return (
        <>
            <Page className="Wallet">
                <Center>
                    {!isConnected ? (
                        <>
                            <Button primary onClick={onConnect} loading={isConnecting}>
                                Connect
                            </Button>
                            {error ? <p className="error">{error}</p> : null}
                        </>
                    ) : (
                        <Card>
                            <Header>Wallet</Header>
                            <p>
                                <strong>Address:</strong>&nbsp;
                                {address.slice(0, 6) + '...' + address.slice(-4)}
                            </p>
                            <p>
                                <strong>Balance:</strong>&nbsp;
                                {balance} DUMMY <Link to="/transfer" state={{ background: location }}>Transfer</Link>
                            </p>
                        </Card>
                    )}
                </Center>
            </Page>
            <Footer />
        </>
    )
}

export default Wallet

/* eslint-disable */

import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

import { QrReader } from 'react-qr-reader';

import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'
import Ticketing from '../../assets/Ticketing.json';

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";

function Admin() {
    const [id, setId] = useState('');

    const initialState = { accounts: '' }
    const [wallet, setWallet] = useState(initialState)

    const [paused, setPaused] = useState(false)

    useEffect(() => {
        const refreshAccounts = (accounts) => {
            if (accounts.length > 0) {
                updateWallet(accounts)
            } else {
                // if length 0, user is disconnected                    
                setWallet(initialState)
            }
        }
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            if (provider) {
                const accounts = await window.ethereum.request(
                    { method: 'eth_accounts' }
                )
                refreshAccounts(accounts)
                window.ethereum.on('accountsChanged', refreshAccounts)
            }
        }
        getProvider()
        return () => {
            window.ethereum.removeListener('accountsChanged', refreshAccounts)
        }
    }, [wallet])

    const updateWallet = async (accounts) => {
        setWallet({ accounts })
    }

    const handleConnect = async () => {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        })
            .then((accounts) => {
                updateWallet(accounts)
            })
            .catch((err) => {
                alert(err)
            })
    }
    const PauseContract = async () => {
        // code to pause contract(solidity api call) and tranfer mapping to verification backend(backend api call)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
        try {
            if (!paused) {
                await contract.pause();
                setPaused(true)
            }
            else {
                alert('Contract already paused')
            }
        } catch (e) {
            console.log("Err: ", e.code)
            if (e.code === 'UNPREDICTABLE_GAS_LIMIT') {
                alert('Contract already paused')
                setPaused(true)
            }
            else {
                alert('Paused failed, try again')
            }
        }
    }
    const getTicketMapping = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
        try {
            const ticketMapping = await contract.getMapping();
            const ticketMappingHashMap = {}
            for (let i = 0; i < ticketMapping.length; i++) {
                ticketMappingHashMap[ticketMapping[i]] === undefined ? ticketMappingHashMap[ticketMapping[i]] = [i] : ticketMappingHashMap[ticketMapping[i]].push(i)
            }
            console.log(ticketMappingHashMap)
        }
        catch (e) {
            console.log("Err: ", e)
            alert('Wait for contract to pause on blockchain and try after some time')
        }
    }

    const UnPauseContract = () => {
        // code to un-pause contract
    };

    return (
        <>
            <DashboardLayout>
                <Grid container spacing={3} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <MDButton
                                size="large"
                                variant="gradient"
                                color="info"
                                circular={false}
                                iconOnly={false}
                                onClick={() => {
                                    handleConnect();
                                }}
                            >
                                Connect MetaMask
                            </MDButton>
                        </MDBox>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {!paused ? <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <MDButton
                                size="large"
                                variant="gradient"
                                color="info"
                                circular={false}
                                iconOnly={false}
                                onClick={() => {
                                    PauseContract();
                                }}
                            >
                                Pause Contract
                            </MDButton>
                        </MDBox>
                    </Grid> : <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <MDButton
                                size="large"
                                variant="gradient"
                                color="info"
                                circular={false}
                                iconOnly={false}
                                onClick={() => {
                                    getTicketMapping();
                                }}
                            >
                                Generate Ticket Owner Mapping
                            </MDButton>
                        </MDBox>
                    </Grid>}
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <MDButton
                                size="large"
                                variant="gradient"
                                color="info"
                                circular={false}
                                iconOnly={false}
                                onClick={() => {
                                    UnPauseContract();
                                }}
                            >
                                Un-Pause Contract
                            </MDButton>
                        </MDBox>
                    </Grid>
                </Grid>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setId(result?.text);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        containerStyle={{ width: '50%', height: '50%' }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {id}
                </div>
            </DashboardLayout>
        </>
    );
}

export default Admin;

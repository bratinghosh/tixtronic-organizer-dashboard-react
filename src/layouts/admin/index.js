/* eslint-disable */

import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

import { QrReader } from 'react-qr-reader';

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

    const PauseContract = () => {
        // code to pause contract(solidity api call) and tranfer mapping to verification backend(backend api call)
    };

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
                            PauseContract();
                        }}
                    >
                        Pause Contract
                    </MDButton>
                </MDBox>
            </Grid>
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

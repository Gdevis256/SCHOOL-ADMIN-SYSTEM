import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg"; 
import BackgroundImage from "../assets/background.png"; 
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Overlay>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <img src={Students} alt="students" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                            <StyledTitle>
                                Welcome to
                                <br />
                                School Management
                                <br />
                                System
                            </StyledTitle>
                            <StyledText>
                                Streamline school management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                                <StyledText>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{color:"#550080"}}>
                                        Sign up
                                    </Link>
                                </StyledText>
                            </StyledBox>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </Overlay>
        </StyledContainer>
    );
};

export default Homepage;


const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 100% !important;
  padding: 0 !important;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4); 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4); 
  backdrop-filter: blur(6px); 
  border-radius: 8px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: bold;
  padding-top: 4;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

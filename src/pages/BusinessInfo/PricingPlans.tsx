import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Button, Typography } from "@mui/material";
import styled from "styled-components";

const PricingPlansContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const PricingPlanOption = styled(Card)`
  width: 200px;
  margin: 20px;
  padding: 15px;
  text-align: center;
`;

const BusinessSignup = () => {
  return (
    <PricingPlansContainer>
      <PricingPlanOption>
        <CardContent>
          <Typography variant="h5">Multiple Business</Typography>
          <Typography variant="body2">
            For entities managing multiple businesses...
          </Typography>
          <Button
            component={Link}
            to="/account?role=PROVIDER_ADMIN&showPlans=false&signingUp=true"
            variant="contained"
            color="primary"
          >
            Choose
          </Button>
        </CardContent>
      </PricingPlanOption>

      <PricingPlanOption>
        <CardContent>
          <Typography variant="h5">Single Business</Typography>
          <Typography variant="body2">
            For individual business entities...
          </Typography>
          <Button
            component={Link}
            to="/account?role=VENUE_ADMIN&showPlans=false&signingUp=true"
            variant="contained"
            color="primary"
          >
            Choose
          </Button>
        </CardContent>
      </PricingPlanOption>

      <PricingPlanOption>
        <CardContent>
          <Typography variant="h5">Sole Trader</Typography>
          <Typography variant="body2">
            For individual sole traders...
          </Typography>
          <Button
            component={Link}
            to="/account?role=SOLE_TRADER&showPlans=false&signingUp=true"
            variant="contained"
            color="primary"
          >
            Choose
          </Button>
        </CardContent>
      </PricingPlanOption>
    </PricingPlansContainer>
  );
};

export default BusinessSignup;

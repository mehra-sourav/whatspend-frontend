import {
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  ListItemButton,
  Collapse,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { truncateMessage } from "@/utils";
import useIsMobile from "@/hooks/common/useIsMobile";
import StatusCard from "@/components/StatusCard";

interface IExpenseItem {
  categoryName: string;
  textMessage: string;
  amount: number;
  createdAt: string;
}

interface IExpenseList {
  expenses: IExpenseItem[] | null;
  loading?: boolean;
  sx?: object;
  error?: boolean;
}

const ExpenseList = ({ expenses, error, loading, sx }: IExpenseList) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { isMobile } = useIsMobile();
  const handleClick = (idx: number): void => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(idx)
        ? prevOpenItems.filter((id) => id !== idx)
        : [...prevOpenItems, idx]
    );
  };

  // Showing loader if data is still loading
  if (loading) {
    return <CircularProgress />;
  }

  // Showing error status card if any error in fetching data
  if (error) {
    return (
      <StatusCard
        primary="There was a problem while fetching data"
        type="error"
        sx={{ height: "105px" }}
      />
    );
  }

  // Showing no data status card if no data available
  if (
    !(error || loading) &&
    (expenses?.length === 0 || expenses === undefined)
  ) {
    return (
      <StatusCard
        primary="No data available for the selected period"
        type="info"
        sx={{ height: "105px" }}
      />
    );
  }

  return (
    <List sx={{ border: "1px solid red", ...sx }}>
      {expenses?.map(
        (
          {
            categoryName: category,
            textMessage: message,
            createdAt,
            amount,
          }: IExpenseItem,
          idx
        ) => (
          <div key={idx}>
            <ListItemButton onClick={() => handleClick(idx)} sx={{ pl: 0 }}>
              <ListItemAvatar>
                <Avatar>{category?.charAt(0).toUpperCase()}</Avatar>
              </ListItemAvatar>

              {/* Category tooltip and name */}
              <Tooltip
                title={
                  isMobile
                    ? category?.length > 10
                      ? category
                      : ""
                    : category?.length > 35
                    ? category
                    : ""
                }
              >
                <ListItemText
                  primary={
                    isMobile
                      ? truncateMessage(category, 10)
                      : truncateMessage(category, 35)
                  }
                />
              </Tooltip>

              <Typography>₹ {amount}</Typography>
            </ListItemButton>
            <Collapse
              in={openItems.includes(idx)}
              timeout="auto"
              unmountOnExit
              sx={{ px: 2 }}
            >
              <Box sx={{ display: "flex" }}>
                {/* Expense message tooltip and name */}
                <Tooltip
                  title={
                    isMobile
                      ? message?.length > 15
                        ? message
                        : ""
                      : message?.length > 35
                      ? message
                      : ""
                  }
                >
                  <ListItemText
                    secondary={
                      isMobile
                        ? truncateMessage(message, 15)
                        : truncateMessage(message, 35)
                    }
                    sx={{ ml: 5, textAlign: "left" }}
                  />
                </Tooltip>

                <ListItemText
                  secondary={createdAt}
                  sx={{ textAlign: "right" }}
                />
              </Box>
            </Collapse>
          </div>
        )
      )}
    </List>
  );
};

export default ExpenseList;

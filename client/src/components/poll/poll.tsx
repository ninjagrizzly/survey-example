import {useState} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import QuestionRating from './question/rating';
import QuestionChoice from './question/choice';

import {usePoll} from './api';

interface PollProps {
    pollID: string;
}

export function Poll({pollID}: PollProps) {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const {status, data, error, isFetching} = usePoll(pollID);

    if (!data || isFetching) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    const currentPageID = data.pageOrder[currentPageIndex];
    const pageQuestionIDs = currentPageID ? data.pages[currentPageID]?.questions : [];
    const questions = pageQuestionIDs.map(qId => data.questions[qId]);

    const isFinishButtonVisible = currentPageIndex === data.pageOrder.length - 1;
    const isPrevButtonVisible = currentPageIndex > 0;

    const handleClickPrev = function () {
        setCurrentPageIndex(page => page - 1);
    }

    const handleClickNext = function() {
        setCurrentPageIndex(page => page + 1);
        if (isFinishButtonVisible) {
            setIsFinished(true);
        }
    }

    if (isFinished) {
        return (
            <Container maxWidth="sm">
                <Box sx={{
                    mt: 2
                }}>
                    <Typography component="legend">Опрос пройден</Typography>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth="sm">
            {/* @ts-ignore */}
            {questions.map(question => (
                question.type === 'rating'
                    ? <QuestionRating key={question.id} {...question} />
                    : <QuestionChoice key={question.id} {...question} />
            ))}
            <Stack spacing={2} direction="row" sx={{
                mt: 2
            }}>
                {isPrevButtonVisible && <Button variant="outlined" onClick={handleClickPrev}>Назад</Button>}
                <Button variant="contained" onClick={handleClickNext}>
                    {isFinishButtonVisible ? 'Завершить' : 'Далее'}
                </Button>
            </Stack>
        </Container>
    );
}
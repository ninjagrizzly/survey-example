import {useMutation, useQuery} from '@tanstack/react-query';

import * as TYPES from './typings';

export function usePoll(pollID: string) {
    return useQuery({
        queryKey: ['poll', pollID],
        queryFn: async (): Promise<TYPES.Poll> => {
            const res = await fetch(`/api/poll/${pollID}`)
            return res.json();
        }
    });
}

type SendAnswerPayload = {
    pollID: string;
    questionID: number;
    answer: number | number[];
}

async function sendAnswer({pollID, questionID, answer}: SendAnswerPayload) {
    const res = await fetch(`/api/poll/${pollID}/answer`, {
        method: 'POST',
        body: JSON.stringify({
            questionID,
            answer
        })
    });
    
    return res.json();
}

export function useSendAnswer() {
    return useMutation(sendAnswer, {
        onSuccess: data => {
            console.log(data);
        },
        onError: () => {
            console.log('error');
        }
    });
}
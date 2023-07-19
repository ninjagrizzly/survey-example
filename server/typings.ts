type BaseQuestion = {
    id: number;
    label: string;
    type: 'choice' | 'rating';
}

type ChoiceQuestion = BaseQuestion & {
    type: 'choice';
    isMulti?: boolean;
    options: {
        id: number;
        label: string;
    }[];
}

type RatingQuestion = BaseQuestion & {
    type: 'rating';
    maxValue: number;
}

export type Poll = {
	id: string;
	questions: {
		[id: number]: ChoiceQuestion | RatingQuestion;
    };

	pages: {
		[id: number]: {
            id: number;
			questions: number[];
		}
	}

	pageOrder: number[];
};

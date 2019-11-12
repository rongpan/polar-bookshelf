import * as React from 'react';
import {TaskRep} from "polar-spaced-repetition/src/spaced_repetition/scheduler/S2Plus/TasksCalculator";
import {RatingCallback} from "./Reviewer";
import {Rating} from "polar-spaced-repetition-api/src/scheduler/S2Plus/S2Plus";
import {RatingButton} from "./RatingButton";
import {GlobalKeyBindingStr} from "../../../../web/js/ui/key_bindings/GlobalKeyBinding";

export class RatingButtonSet<A> extends React.Component<IProps<A>, IState> {

    constructor(props: IProps<A>, context: any) {
        super(props, context);
    }

    public render() {

        const {ratings, taskRep} = this.props;

        return ratings.map(rating => <RatingButton key={rating.value}
                                                   taskRep={taskRep}
                                                   rating={rating.value}
                                                   keyBinding={rating.keyBinding}
                                                   onRating={() => this.props.onRating(taskRep, rating.value)}/>);

    }

}


export interface RatingWithKeyBinding {
    readonly value: Rating;
    readonly keyBinding?: GlobalKeyBindingStr;
}

export interface IProps<A> {

    readonly taskRep: TaskRep<A>;
    readonly ratings: ReadonlyArray<RatingWithKeyBinding>;
    readonly onRating: RatingCallback<A>;

}

export interface IState {

}

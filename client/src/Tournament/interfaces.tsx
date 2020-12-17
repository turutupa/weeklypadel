import { RouteComponentProps } from 'react-router-dom';
interface MatchParams {
  tournament: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {}

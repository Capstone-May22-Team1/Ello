import React from "react";
import { Route } from "react-router-dom";

import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import Board from "./board/Board";

import CardView from "./card/CardView";

import AllBoards from "./ui/AllBoards";

import Card from "./ui/Card";
import CardArchived from "./ui/CardArchived";
import CardEditingDescription from "./ui/CardEditingDescription";
import CopyCardPopover from "./ui/CopyCardPopover";
import CreateBoard from "./ui/CreateBoard";
import DueDatePopover from "./ui/DueDatePopover";
import LabelsPopover from "./ui/LabelsPopover";
import MoveCardPopover from "./ui/MoveCardPopover";
import SingleBoard from "./ui/SingleBoard";
import UISection from "./ui/UISection";


const Application = () => {
  return (
    <div>
      <TopNav />
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/(boards|cards)/:id" exact component={Board} />
      <Route path="/cards/:cardId" exact component={CardView} />

      <Route path="/ui" exact component={UISection} />
      <Route path="/ui/allBoards" component={AllBoards} />
      <Route path="/ui/cardArchived" component={CardArchived} />
      <Route
        path="/ui/cardEditingDescription"
        component={CardEditingDescription}
      />
      <Route path="/ui/card" component={Card} />
      <Route path="/ui/copyCardPopover" component={CopyCardPopover} />
      <Route path="/ui/createBoard" component={CreateBoard} />
      <Route path="/ui/dueDatePopover" component={DueDatePopover} />
      <Route path="/ui/labelsPopover" component={LabelsPopover} />
      <Route path="/ui/moveCardPopover" component={MoveCardPopover} />
      <Route path="/ui/singleBoard" component={SingleBoard} />
    </div>
  );
};

export default Application;
// <Route path="/(boards|cards)/:id" exact component={Board} />
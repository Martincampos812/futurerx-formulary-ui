
import React, { useState } from "react";
import FrxGridDateHighliter from "../../components/shared/FrxGrid/components/FrxGridDateHighliter/FrxGridDateHighliter";
import FrxUserCell from "../../components/shared/FrxGrid/components/FrxUserCell/FrxUserCell";
import { Column } from "../../models/grid.model";
import { dateFilters, numberFilters, textFilters } from "./filters";
import DialoguePopup from "../../components/shared/FrxDialogPopup/FrxDialogPopup";
import ClaimGridModel from "../../components/ClaimsGridModel/ClaimsGridModel";
import FrxGridToolTip from "../../components/shared/FrxGrid/components/FrxGridToolTip/FrxGridToolTip";
import {
  FormularyTierColumn,
  FormularyLimitColumn,
} from "../../components/formulary/Components/FormularyTable/FormularyColumns";
import AuthGridModel from '../../components/AuthsAndOverrides/AuthGridModel';

export const getCommunicationsGrievances: () => Column<any>[] = () => {
    return [
      {
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 152,
        key: "name",
        displayTitle: "NAME",
        isFilterable: true,
        dataType: "string",
        filters: textFilters,
        hidden: false,
        sortDirections: [],
      },
      {
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 150,
        key: "date",
        isFilterable: true,
        showToolTip: false,
        displayTitle: "DATE",
        dataType: "date",
        filters: dateFilters,
        hidden: false,
        sortDirections: [],
      },
      {
        position: 3,
        sorter: {},
        textCase: "upper",
        isFilterable: true,
        pixelWidth: 171,
        key: "type",
        displayTitle: "TYPE",
        dataType: "string",
        filters: dateFilters,
        hidden: false,
        sortDirections: [],
      },
      {
        position: 4,
        textCase: "upper",
        pixelWidth: 326,
        sorter: {},
        isFilterable: true,
        key: "description",
        displayTitle: "DESCRIPTION",
        filters: textFilters,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
    ];
  };
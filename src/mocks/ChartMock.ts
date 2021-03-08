export const getBarChartData = () => {
  return barChartData;
}

const barChartData = {
  "january": [
    {
      "key": "paid",
      "value": 7.4
    },
    {
      "key": "rejected",
      "value": 2.6
    }
  ],
  "february": [
    {
      "key": "paid",
      "value": 12
    },
    {
      "key": "rejected",
      "value": 4
    }
  ],
  "march": [
    {
      "key": "paid",
      "value": 12
    },
    {
      "key": "rejected",
      "value": 6
    }
  ],
  "april": [
    {
      "key": "paid",
      "value": 10
    },
    {
      "key": "rejected",
      "value": 2
    }
  ],
  "may": [
    {
      "key": "paid",
      "value": 10
    },
    {
      "key": "rejected",
      "value": 4
    }
  ],
  "june": [
    {
      "key": "paid",
      "value": 3
    },
    {
      "key": "rejected",
      "value": 7
    }
  ],
  "july": [
    {
      "key": "paid",
      "value": 5
    },
    {
      "key": "rejected",
      "value": 5
    }
  ],
  "august": [
    {
      "key": "paid",
      "value": 11
    },
    {
      "key": "rejected",
      "value": 9
    }
  ],
  "september": [
    {
      "key": "paid",
      "value": 9
    },
    {
      "key": "rejected",
      "value": 5
    }
  ],
  "october": [
    {
      "key": "paid",
      "value": 21
    },
    {
      "key": "rejected",
      "value": 7
    }
  ],
  "november": [
    {
      "key": "paid",
      "value": 21
    },
    {
      "key": "rejected",
      "value": 7
    }
  ],
  "december": [
    {
      "key": "paid",
      "value": 21
    },
    {
      "key": "rejected",
      "value": 7
    }
  ]
}
// End of barChartData

export const getPrescriberBarChartData = () => {
  return {
    "january": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 2
      },
      {
        "key": "Adherence",
        "value": 7
      }
    ],
    "february": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 4
      },
      {
        "key": "Adherence",
        "value": 12
      }
    ],
    "march": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 6
      },
      {
        "key": "Adherence",
        "value": 12
      }
    ],
    "april": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 2
      },
      {
        "key": "Adherence",
        "value": 10
      }
    ],
    "may": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 4
      },
      {
        "key": "Adherence",
        "value": 10
      }
    ],
    "june": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 7
      },
      {
        "key": "Adherence",
        "value": 3
      }
    ],
    "july": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 5
      },
      {
        "key": "Adherence",
        "value": 5
      }
    ],
    "august": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 9
      },
      {
        "key": "Adherence",
        "value": 11
      }
    ],
    "september": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 5
      },
      {
        "key": "Adherence",
        "value": 9
      }
    ],
    "october": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 7
      },
      {
        "key": "Adherence",
        "value": 21
      }
    ],
    "november": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 7
      },
      {
        "key": "Adherence",
        "value": 21
      }
    ],
    "december": [
      {
        'key': "CMR",
        "value": 5
      },
      {
        "key": "GDR",
        "value": 7
      },
      {
        "key": "Adherence",
        "value": 21
      }
    ]
  };
}
export const getPrescriberBarChartDataFilters = () => {
  return [
    { id: 1, display: 'CMR', key: 'CMR' },
    { id: 2, display: 'GDR', key: 'GDR' },
    { id: 3, display: 'Adherence', key: 'Adherence' }
  ]
}

export const getPrescribedMemberServiced = () => {
  return {
    "january": [
      {
        'key': "Member Serviced",
        "value": 100
      }
    ],
    "february": [
      {
        'key': "Member Serviced",
        "value": 211
      }
    ],
    "march": [
      {
        'key': "Member Serviced",
        "value": 278
      }
    ],
    "april": [
      {
        'key': "Member Serviced",
        "value": 412
      }
    ],
    "may": [
      {
        'key': "Member Serviced",
        "value": 368
      }
    ],
    "june": [
      {
        'key': "Member Serviced",
        "value": 122
      }
    ],
    "july": [
      {
        'key': "Member Serviced",
        "value": 245
      }
    ],
    "august": [
      {
        'key': "Member Serviced",
        "value": 370
      }
    ],
    "september": [
      {
        'key': "Member Serviced",
        "value": 285
      }
    ],
    "october": [
      {
        'key': "Member Serviced",
        "value": 427
      }
    ],
    "november": [
      {
        'key': "Member Serviced",
        "value": 220
      }
    ],
    "december": [
      {
        'key': "Member Serviced",
        "value": 210
      }
    ]
  };
}

export const getPrescribedAverageTotalCost = () => {
  return {
    "january": [
      {
        'key': "Average Total Cost",
        "value": 56
      }
    ],
    "february": [
      {
        'key': "Average Total Cost",
        "value": 96
      }
    ],
    "march": [
      {
        'key': "Average Total Cost",
        "value": 87
      }
    ],
    "april": [
      {
        'key': "Average Total Cost",
        "value": 132
      }
    ],
    "may": [
      {
        'key': "Average Total Cost",
        "value": 27
      }
    ],
    "june": [
      {
        'key': "Average Total Cost",
        "value": 122
      }
    ],
    "july": [
      {
        'key': "Average Total Cost",
        "value": 75
      }
    ],
    "august": [
      {
        'key': "Average Total Cost",
        "value": 63
      }
    ],
    "september": [
      {
        'key': "Average Total Cost",
        "value": 91
      }
    ],
    "october": [
      {
        'key': "Average Total Cost",
        "value": 85
      }
    ],
    "november": [
      {
        'key': "Average Total Cost",
        "value": 130
      }
    ],
    "december": [
      {
        'key': "Average Total Cost",
        "value": 90
      }
    ]
  };
}
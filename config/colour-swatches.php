<?php

function set_default_color($colors, $default = 'primary')
{
    $key = array_search($default, array_column($colors, 'label'));
    $colors[$key]['default'] = true;
    return $colors;
};


$themePalette = [
    [
        'label'   => 'white',
        'color'   => '#ffffff',
        'default' => false,
    ],
];

return [
    'palettes' => [
        'Background' => set_default_color($themePalette, 'white'),
        'Button' => set_default_color($themePalette, 'white'),
    ]
];

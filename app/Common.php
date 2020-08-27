<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Common extends Model
{
    public static function ZykComponents(){
        $components = collect();

        $components->push(
            array(
                'GroupId' => 0,
                'GroupTitle' => 'Components non Javascript',
                'Features' => array(
                    0 => array(
                        'Id' => 0,
                        'Title' => 'Alert',
                        'Config' => array(
                            'Tags' => array(
                                'div',
                            ),
                            'NeedJs' => false,
                            'Class' => array(
                                'alert'
                            ),
                            'Classes' => [],
                        ),
                    ),
                    1 => array(
                        'Id' => 1,
                        'Title' => 'Button',
                        'Config' => array(
                            'Tags' => array(
                                'a',
                                'button'
                            ),
                            'NeedJs' => false,
                            'Class' => array(
                                'btn'
                            ),
                            'Classes' => array(
                                'btn-sm',
                                'btn-lg',
                                'btn-default',
                                'btn-primary',
                                'btn-secondary',
                                'btn-success',
                                'btn-warning',
                                'btn-danger',
                                'btn-link',
                                'btn-light',
                                'btn-dark',
                                'btn-outline-default',
                                'btn-outline-primary',
                                'btn-outline-secondary',
                                'btn-outline-success',
                                'btn-outline-warning',
                                'btn-outline-danger',
                                'btn-outline-link',
                            ),
                        ),
                    ),
                    2 => array(
                        'Id' => 2,
                        'Title' => 'Card',
                        'Config' => array(
                            'Tags' => array(
                                'div',
                            ),
                            'NeedJs' => false,
                            'Class' => array(
                                'card'
                            ),
                            'Classes' => array(
                                'card-no-shadow'
                            ),
                        ),
                    ),
                ),
            ),
        );

        $components->push(
            array(
                'GroupId' => 0,
                'GroupTitle' => 'Components with Javascript',
                'Features' => array(
                    0 => array(
                        'Id' => 0,
                        'Title' => 'Calendar',
                        'Config' => array(
                            'Tags' => array(
                                'div',
                            ),
                            'NeedJs' => true,
                        ),
                    ),
                    1 => array(
                        'Id' => 1,
                        'Title' => 'Collapse',
                        'Config' => array(
                            'Tags' => array(
                                'div',
                            ),
                            'NeedJs' => true,
                        ),
                    ),
                ),
            ),
        );

        return $components;
    }
}

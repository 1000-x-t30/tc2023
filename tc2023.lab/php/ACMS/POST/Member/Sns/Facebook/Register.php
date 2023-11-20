<?php

class ACMS_POST_Member_Sns_Facebook_Register extends ACMS_POST_Member_Sns_Facebook_Signin
{
    /**
     * アクションを設定（signin|admin-login|signup|register）
     * @return string
     */
    protected function getActionName(): string
    {
        return 'register';
    }
}
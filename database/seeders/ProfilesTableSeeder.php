<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('profiles')->insert([
            'name' => 'たかお',
            'work' => 'webエンジニア',
            'profile_text' => '現役でシステムエンジニアをしているたかおです。\nSmart Profileの開発者、現在は保守運用しています。\nプロフィールサイトとして利用できます。\n\n本業はプログラマで不動産関係のサイトの保守運用をしています。',
            'user_id' => 1
        ]);
    }
}
